import {Row,Col, Icon,message,Button, Tabs, Form,Input,Radio,Tooltip,Select,InputNumber,Tree,Modal,Switch,Descriptions,DatePicker} from 'antd';
const {TextArea} = Input;
import {DATE_FORMAT} from '../../../constants/misc';
import './style.scss';
import { useState,useRef,useEffect } from 'react';
import {createTask} from '../../../services/tasks';
import moment from 'moment';
import Dots from '../../../components/Dots';
const NamingMap = {1:"Basic Details",2:"Technical Requirements",3:"Define Labels",4:"Payment"}
const pageAttrs = [['task_type','title','description','tags'],["height","width","quantity","extension","image_type"],["price",'deadline']]
const annotationMap = {"pn":"Point Annotation","ln":"Line Annotation","rec":"Rectangle Annotation"};
function indexInObj(elem,obj){

    for (let i=0;i<obj.length;i++){
        
        if (obj[i].includes(elem))return i+1
    }
}
function locateLowestErrorPage(e){
    let min = 100;
    for (let k in e.errors){
        const index = indexInObj(k,pageAttrs)
        
        
        if(index < min){
            min=index;
        }
    }
    console.log(min)
    return min;
}
function findNode(array,value){
    for(let i=0;i<array.length;i++){
        if(array[i].key==value){
            return array[i]
        }
        const inner = findNode(array[i].children,value)
        if(inner!=false){
            return inner;
        }
    }
    return false;
}
function findParentNode(array,value){
    // Only call if value is not in the Root Node
    for(let i=0;i<array.children.length;i++){
        if(array.children[i].key==value){
            return [array,i];
        }
        const [inner,index] = findParentNode(array.children[i],value);
        if(inner!=false){
            return [inner,index]
        }
    }
    return [false,false];
    

}
function Add({form}){
    const refforWidth = useRef(null);
    const width = refforWidth.current?refforWidth.current.offsetWidth:800    
    const [labelModal,setLabelModal] = useState(false);
    const [page,setPage] = useState(1);
    const [labelsData,setlabelsData] = useState([])
    const [selectedNode,setSelectedNode] = useState([])    
    const [submitLoad,setSubmitLoad] = useState(false);
    let node=false;
    if(selectedNode.length){
        node = findNode(labelsData,selectedNode[0]);
    }
    function deleteLabel(value){        
        for(let i=0;i<labelsData.length;i++){
            if(labelsData[i].key==value){
                labelsData.splice(i,1);
                setlabelsData([...labelsData])
                setSelectedNode([])
                return
            }
        }
        for(let i=0;i<labelsData.length;i++){
            const [parent,index] = findParentNode(labelsData[i],value)
            if(parent!=false){
                parent.children.splice(index,1);
            }
        }
        setlabelsData([...labelsData])
        setSelectedNode([])
        
    }
    function addNewLabel(){
        validateFields(["newLabelName",'newLabelDesc','newLabelType','newLabelHas','newLabelAnnotation']).then(e=>{
            const s = getFieldsValue(["newLabelName",'newLabelDesc','newLabelType','newLabelHas','newLabelAnnotation']);
            let obj={}
            if(s.newLabelHas){
                obj = {key:s.newLabelName,title:s.newLabelName,label_type:s.newLabelType,description:s.newLabelDesc,name:s.newLabelName,annotation:s.newLabelAnnotation,children:[]}
            }else{
                obj = {key:s.newLabelName,title:s.newLabelName,label_type:s.newLabelType,description:s.newLabelDesc,name:s.newLabelName,children:[]}
            }
            if(selectedNode.length){                                                
                if(node==false){return}
                if(!node.annotation){
                    message.error("Only Annotated Labels can have Sublabels");
                    return
                }
                node.children.push(obj);
                console.log(node);
                console.log(labelsData);
                setlabelsData([...labelsData]);
                setLabelModal(false);
                return
            }

            setlabelsData([...labelsData,obj])
            setLabelModal(false);
        },e=>{

        })
    }
    function submitTask(){
        setSubmitLoad(true);
        validateFields([...pageAttrs[0],...pageAttrs[1],...pageAttrs[2]]).then(e=>{
            let data = getFieldsValue([...pageAttrs[0],...pageAttrs[1],...pageAttrs[2]]);
            data.deadline = moment(data.deadline).format(DATE_FORMAT);
            if(labelsData.length)data.labels = labelsData;
            createTask(data).then(e=>{
                console.log(e)
            },e=>{
                console.log(e)
            })
            
        },e=>{setPage(locateLowestErrorPage(e))})
        .finally(()=>{setSubmitLoad(false);})    
    }
    const {
        getFieldDecorator,
        validateFields,
        getFieldValue,
        resetFields,
        getFieldsValue
      } = form;
    function technicalDetails(type){
        switch(type){
            case "image":
                return(<>
                    <Col span={24}>
                        <Row type='flex' justify='center' align="middle">
                            <h3>Image Dimensions <Tooltip title="Dimensions of the output image as (Height X Width)">
                            <Icon className="blue-light-text" type='question-circle'/>
                            </Tooltip></h3>
                            <div ref={refforWidth} style={{overflow:"hidden",width:"100%"}}>
                                <div style={{width:(getFieldValue("width")/getFieldValue("height")*270<width)?(getFieldValue("width")/getFieldValue("height")*270):width}} className="image-preview"></div>
                            </div>
                                               
                        <Form.Item >
                            {getFieldDecorator("height",{
                                    initialValue:1080,
                                    rules: [
                                        
                                    {
                                            
                                    required: true,
                                    message: 'Please select type'
                                    }
                                ]
                            })(<InputNumber  placeholder="1920px"/>)}
                        </Form.Item>
                        <Form.Item>
                            <span style={{margin:"0 5px"}}>X</span>
                        </Form.Item>
                        <Form.Item >
                            {getFieldDecorator("width",{
                                    initialValue:1920,
                                    rules: [
                                        
                                    {
                                            
                                    required: true,
                                    message: 'Please select type'
                                    }
                                ]
                            })(<InputNumber  placeholder="1080px"/>)}
                        </Form.Item>
                        </Row>
                    </Col>
                    <Col span={6} offset={1}>                               
                    <Form.Item label={ <span style={{fontSize:"1em"}}>
                            Image Quantity&nbsp;
                            <Tooltip title="Select the quantity of images to be crowdsourced">
                            <Icon className="blue-light-text" type='question-circle'/>
                            </Tooltip>
                        </span>}>
                        {getFieldDecorator("quantity",{

                                rules: [
                                    
                                {
                                        
                                required: true,
                                message: 'Please select type'
                                }
                            ]
                        })(<InputNumber style={{width:"100%"}} placeholder="i.e. 1000"/>)}
                    </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                    <Form.Item label={ <span style={{fontSize:"1em"}}>
                            Image Extension&nbsp;
                            <Tooltip title="Select the extension of the image.">
                            <Icon className="blue-light-text" type='question-circle'/>
                            </Tooltip>
                        </span>}>
                            {
                            getFieldDecorator("extension", {
                                rules: [
                                {  required:true,                        
                                    message: 'Please input your Image Extension'
                                }
                                ]
                            })(
                                <Select>
                                <Select.Option value="JPEG">JPEG</Select.Option>
                                <Select.Option value="PNG">PNG</Select.Option>
                                <Select.Option value="TIFF">TIFF</Select.Option>
                                </Select>
                            )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                    <Form.Item label={ <span style={{fontSize:"1em"}}>
                            Image Type&nbsp;
                            <Tooltip title="Select the type of the image.">
                            <Icon className="blue-light-text" type='question-circle'/>
                            </Tooltip>
                        </span>}>
                        {
                        getFieldDecorator("image_type", {
                            rules: [
                            {
                                required: true,
                                message: 'Please input your Image Type'
                            }
                            ],
                            placeholder: 200
                        })(
                            <Select>
                            <Select.Option value="RGBA">RGBA</Select.Option>
                            <Select.Option value="RGB">RGB</Select.Option>
                            <Select.Option value="Grayscale">Grayscale</Select.Option>
                            </Select>
                        )
                        }
                    </Form.Item>
                    </Col>
                   

                    </>
                )
            default:
                return null   
        }


    }     
    function Labels(type){
        switch(type){
            case "image":
                return (<>
                   <Col lg={10}>
                       <Button onClick={()=>{setLabelModal(true)}} type='primary'>{selectedNode.length?"Add Sublabel":"Add Label"}</Button>
                       {selectedNode.length?<Button style={{marginLeft:"0.35rem"}} onClick={()=>{deleteLabel(selectedNode)}} type='danger'>Delete Label</Button>:null}
                       
                       <Form.Item label={ <span style={{fontSize:"1em"}}>                           
                            Task Labels&nbsp;
                            <Tooltip title="Carefully define all the labels that you want to get with your data. ">
                            <Icon className="blue-light-text" type='question-circle'/>
                            </Tooltip>
                        </span>}>
                       <Tree onSelect={(e)=>{setSelectedNode(e)}}   showLine={true}
                   showIcon={true} treeData={labelsData}/> 
                       </Form.Item>
                   </Col>
                   <Col lg={14}>
                    {selectedNode.length?                           
                        <Descriptions style={{"marginTop":"1rem"}} bordered>
                            <Descriptions.Item span={4} label="Label Type">
                                <span className="cyan-text">{node.label_type.toUpperCase()}</span>
                            </Descriptions.Item>
                            <Descriptions.Item span={4} label="Label Name">
                                {node.name}
                            </Descriptions.Item>
                            <Descriptions.Item span={4} label="Label Description">
                                {node.description}
                            </Descriptions.Item>
                            {node.annotation?
                             <Descriptions.Item span={4} label="Label Annotation">
                             {annotationMap[node.annotation]}
                            </Descriptions.Item>   
                            :null}
                        </Descriptions>
                        :null}

                   </Col>
                </>)
            default:
                return null
        }
    } 
    return (
        
        <Row>
            <Col className="add-task-container" lg={{span:18,offset:3}}>
                    <Row style={{height:"100%",width:"100%"}} type='flex'>
                        <Col className="left" >
                            <Row style={{height:"100%",width:"100%",flexDirection:"column"}} type='flex' align='middle' justify='space-between'>
                                <Col><Button onClick={()=>{page>=2?setPage(page-1):null}} size="large" type="ghost" shape="circle"><Icon style={{color:"white"}} type="arrow-up"/></Button></Col>
                                <Col>
                                    <Dots count={4} selected={page} setSelected={setPage}></Dots>
                                </Col>
                                <Col><Button onClick={()=>{page<=3?setPage(page+1):null}} size="large" type="ghost" shape="circle"><Icon style={{color:"white"}} type="arrow-down"/></Button></Col>
                            </Row>
                        </Col>
                        <Col className="right">
                            <Row type="flex" style={{flexDirection:"column",height:"100%",width:"100%",padding:"1rem 2rem"}}>
                                <Col ><h2 style={{fontWeight:"600",paddingBottom:"1rem",borderBottom:"1px solid whitesmoke"}} className="blue-light-text">{NamingMap[page]}</h2></Col>
                               <Col style={{flex:"1"}}>
                               <Form style={{height:"100%",width:"100%"}}>
                               <Modal
                                    visible={labelModal}
                                    closable={true}
                                    onCancel={() => {setLabelModal(false)}}
                                    title="Add New Label"
                                    footer={[
                                    <Button onClick={addNewLabel} key="submit" type="primary">
                                        Add
                                    </Button>
                                    ]}
                                >
                                    <Row>
                                    <Col span={24}>
                                        <Form.Item label="Name of label">
                                        {
                                            getFieldDecorator('newLabelName', {
                                            rules: [
                                                {
                                                required: true,
                                                message: 'Please select Name of Label'
                                                }
                                            ]
                                            })(<Input maxLength={50} />)
                                        }
                                        </Form.Item>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col span={24}>
                                        <Form.Item label="Description of label">
                                        {
                                            getFieldDecorator('newLabelDesc')(
                                            <TextArea autoSize={{ minRows: 2, maxRows: 8 }} />
                                            )
                                        }
                                        </Form.Item>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col span={12}>
                                        <Form.Item label="Type of label">
                                        {
                                            getFieldDecorator('newLabelType', {
                                            rules: [
                                                {
                                                required: true,
                                                message: 'Please select Type of Label'
                                                }
                                            ]
                                            })(
                                            <Select style={{ width: '100%' }}>
                                                <Select.Option value="integer">Integer Label</Select.Option>
                                                <Select.Option value="decimal">Decimal Label</Select.Option>
                                                <Select.Option value="boolean">Boolean Label</Select.Option>
                                                <Select.Option value="date">Date Label</Select.Option>
                                                <Select.Option value="text">Text Label</Select.Option>
                                                <Select.Option value="file">File Label</Select.Option>
                                            </Select>
                                            )
                                        }
                                        </Form.Item>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col span={10}>
                                        <Form.Item label="Has Annotation">
                                        {
                                            getFieldDecorator('newLabelHas', {
                                            initialValue: false,
                                            valuePropName: 'checked'
                                            })(<Switch />)
                                        }
                                        </Form.Item>
                                    </Col>
                                    <Col span={14}>
                                        <Form.Item label="Annotation Type" style={{ display: getFieldValue("newLabelHas") ? "initial" : "none" }}>
                                        {
                                            getFieldDecorator('newLabelAnnotation', {
                                            rules: [
                                                {
                                                required: getFieldValue("newLabelHas"),
                                                message: "Chose the Type of annotation"
                                                }
                                            ],
                                            })(
                                            <Select style={{ width: "100%" }}>
                                                <Select.Option value="ln">Line Annotation</Select.Option>
                                                <Select.Option value="rec">Rectangular Annotation</Select.Option>
                                                <Select.Option value="px">Point Annotation</Select.Option>
                                            </Select>
                                            )
                                        }
                                        </Form.Item>
                                    </Col>
                                    </Row>
                                </Modal>
                                    <Tabs style={{height:"100%",width:"100%"}} animated={true} activeKey={String(page)}>
                                        <Tabs.TabPane key="1">                                            
                                            <Col span={24}>                               
                                            <Form.Item label={ <span style={{fontSize:"1em"}}>
                                                    Data Type&nbsp;
                                                    <Tooltip title="Select the type of data">
                                                    <Icon className="blue-light-text" type='question-circle'/>
                                                    </Tooltip>
                                                </span>}>
                                                {getFieldDecorator("task_type",{
                                                    initialValue:"image",
                                                     rules: [
                                                         
                                                        {
                                                               
                                                        required: true,
                                                        message: 'Please select type'
                                                        }
                                                    ]
                                                })(<Radio.Group >
                                                    <Radio.Button value="image">Image</Radio.Button>
                                                    <Radio.Button disabled value="video">Video</Radio.Button>
                                                    <Radio.Button disabled value="audio">Audio</Radio.Button>
                                                </Radio.Group>)}
                                            </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                
                                                <Form.Item label={ <span style={{fontSize:"1em"}}>
                                                    Order Title&nbsp;
                                                    <Tooltip title="Chose succinct, simple and descriptive title. ">
                                                    <Icon className="blue-light-text" type='question-circle'/>
                                                    </Tooltip>
                                                </span>}>
                                                {
                                                    getFieldDecorator('title', {
                                                    rules: [
                                                        {
                                                        required: true,
                                                        message: 'Please input your Title'
                                                        }
                                                    ]
                                                    })(<Input size="large" placeholder="Street Images" />)
                                                }
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                            <Form.Item label={ <span style={{fontSize:"1em"}}>
                                                    Order Description&nbsp;
                                                    <Tooltip title="Wrtie any other informations that is relevant for completing the order">
                                                    <Icon className="blue-light-text" type='question-circle'/>
                                                    </Tooltip>
                                                </span>}>
                                            {
                                                getFieldDecorator('description', {
                                               
                                                })(
                                                <TextArea                                                    
                                                    autoSize={{ minRows: 4, maxRows: 5 }}
                                                    placeholder="Detailed explanation ... " />
                                                )
                                            }
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label={<span style={{fontSize:"1em"}}>
                                                    Tags&nbsp;
                                                    <Tooltip title="Relevat tags will help finding your task faster">
                                                    <Icon className="blue-light-text" type='question-circle'/>
                                                    </Tooltip>
                                                </span>}>
                                            {
                                                getFieldDecorator('tags')(
                                                <Select
                                                    
                                                    mode="tags"
                                                    style={{ width: '100%' }}
                                                    size="large"
                                                    placeholder="Tags Mode">
                                                    <Select.Option key="animals">Animals</Select.Option>
                                                    <Select.Option key="fauna">Fauna</Select.Option>
                                                    <Select.Option key="people">People</Select.Option>
                                                </Select>,
                                                )
                                            }
                                            </Form.Item>
                                        </Col>
                                        <Button onClick={()=>{validateFields(pageAttrs[0]).then(e=>{setPage(2)},e=>{})    }} className="next">Proceed</Button>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane key="2">
                                            {technicalDetails(getFieldValue("task_type"))}
                                            <Button onClick={()=>{validateFields([...pageAttrs[0],...pageAttrs[1]]).then(e=>{setPage(3)},e=>{setPage(locateLowestErrorPage(e))})    }} className="next">Proceed</Button>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane key="3">
                                            {Labels(getFieldValue("task_type"))}
                                            <Button onClick={()=>{validateFields([...pageAttrs[0],...pageAttrs[1]]).then(e=>{setPage(4)},e=>{setPage(locateLowestErrorPage(e))})    }} className="next">Proceed</Button>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane key="4">
                                            <Col> 
                                                                              
                                                <Form.Item label={ <span style={{fontSize:"1em"}}>
                                                        Price&nbsp;
                                                        <Tooltip title="The price that you define will be split between your data providers according to the share of quantity">
                                                        <Icon className="blue-light-text" type='question-circle'/>
                                                        </Tooltip>
                                                    </span>}>
                                                       
                                                    {getFieldDecorator("price",{                                                        
                                                        rules: [
                                                            
                                                            {
                                                                
                                                            required: true,
                                                            message: 'Please define a price'
                                                            }
                                                        ]
                                                    })(<InputNumber
                                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                       
                                                        size='large'
                                                        min='0'/>)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}> 
                                                                              
                                                <Form.Item label={ <span style={{fontSize:"1em"}}>
                                                        Deadline&nbsp;
                                                        <Tooltip title="The price that you define will be split between your data providers according to the share of quantity">
                                                        <Icon className="blue-light-text" type='question-circle'/>
                                                        </Tooltip>
                                                    </span>}>
                                                       
                                                    {getFieldDecorator("deadline",{                                                        
                                                        rules: [
                                                            
                                                            {
                                                                
                                                            required: true,
                                                            message: 'Please set your deadline'
                                                            }
                                                        ]
                                                    })(<DatePicker/>)}
                                                </Form.Item>
                                            </Col>
                                            <Button loading={submitLoad} onClick={submitTask} className="next">Proceed</Button>
                                        </Tabs.TabPane>
                                    </Tabs>
                                </Form>
                               </Col>
                            </Row>
                        </Col>
                    </Row>
            </Col>
        </Row>
    )
    
}
export default Form.create()(Add);