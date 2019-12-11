var time =1;

function copy(mainObj) {
    let objCopy = {}; // objCopy will store a copy of the mainObj
    let key;
  
    for (key in mainObj) {
      objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
  }
class NodeSet{   
    constructor(radius, labels, parent,bgcolor,content,links,coords,mouse,stat,animate){
        this.radius = radius;
        this.parent = parent;
        console.log(parent);
        this.bgcolor = bgcolor;
        this.content = content;
        this.links = links;
        this.elements = [];
        this.frame_width = parent.offsetWidth;
        this.frame_height = parent.offsetHeight;
        this.coords = coords;
        this.mouseanimate = mouse;
        this.labels = labels;
        this.animate = animate;
        if(mouse){
            var mythis = this;
            $(document.body).mousemove(function( event ) {
                var parentOffset = $(mythis.parent).offset();
                mythis.mouseX = event.pageX - parentOffset.left;
                mythis.mouseY = event.pageY - parentOffset.top;
                
              });
        }
        $(document.body).on('resize',function( event ) {
            this.animateSet();
            
          });
        this.stat = stat;
    }

    elementCreate(i){
        var left = this.coords[i][0] * this.frame_width / 100 -this.radius/2;
        var top = this.coords[i][1] * this.frame_height / 100 - this.radius/2;
        var temp = new Node(this,this.content[i],left,top,this.labels[i]);
        temp.run();
        this.elements.push(temp);
    }
    
    
    run(){
        
        for(var i=0;i<this.content.length;i++){
            this.elementCreate(i);
        }
        for(var i=0;i<this.links.length;i++){
          
            for(var j=0;j<this.links[i].length;j++){
           
                this.elements[i].addEdgeNone(this.elements[this.links[i][j]]);
            }
           
        }
        if(this.stat != undefined){
            for(var i=0;i<this.stat.node.length;i++){
                this.elements[this.stat.node[i]].addStatic(this.stat.elem);
            }
        }

        this.animateSet();
      

    
       
    }
 
    animateSet(){
        var i=0;
        do{
        var resulting = [];
        
        for(var j=0;j<this.elements.length;j++){
            resulting.push(this.elements[j].calculateForces(this.elements,this.mouseX,this.mouseY));
        }
        for(var j=0; j< resulting.length;j++){
            this.elements[j].moveElement(resulting[j]);
        }
        
        
        time+=0.001;
        }while(!this.teststop());
        console.log(i);
        for(var i=0; i< resulting.length;i++){
            this.elements[i].applyMoves(resulting[i]);
            
        }
        for(var i=0; i< resulting.length;i++){
            this.elements[i].adjustEdges(this.elements);
            
        }

        // if(this.animate)Animation(50);
    }

    teststop(){
        var stop = true;
        for(var i=0;i<this.elements.length;i++){
            console.log(this.elements[i].finish);
            stop &= this.elements[i].finish;
        }
        console.log(stop);
        return stop;
    }
    Animation(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].startAnimation();
        }
    }
}



class Node{
    
    constructor(parent,content,left,top,label){
        this.parent = parent;
        this.pos = {'left':left,'top':top};
        this.content = content;
        this.label = label;

        //Decorative
        this.edges = [];
        this.edgelines = [];
        this.distances = {};
        this.angles = {};
        //fast acceess

        this.col_const = 1;
        this.hook_const = 0.13;
        this.charge =1200/(parent.radius/40);
        this.prev = [0,0];
        this.length = 8*parent.radius;
        this.mouse_charge = 50;
        //Charges and stuff
      
    }
    addStatic(stat){
        this.stat = stat;
        $(stat).css("z-index",999);
        
        this.static_radius = $(stat).height();        
        this.staticEdge();
        
    }

    distance(pos1,pos2){
        var a = pos1.top - pos2.top;
        var b = pos1.left - pos2.left;
        return Math.sqrt( a*a + b*b )
    }
    magnitude(v){
        var a = v[0];
        var b = v[1];
        return Math.sqrt( a*a + b*b )
    }
    centralize_points(pos,radius){
        pos.left = pos.left + radius/2;
        pos.top = pos.top + radius/2;
    }
    dot(v1 , v2){
        var sum =0;
        for(var i =0; i<v1.length;i++){
            sum += v1[i]*v2[i];
        }
        return sum;
    }
    coloumbAttraction(node){
        var pos1 = copy(this.pos);
        var pos2 = copy(node.pos);
        this.centralize_points(pos1,this.parent.radius);
        this.centralize_points(pos2,this.parent.radius);
        var d = this.distance(pos1,pos2);
        
        var magn = (this.col_const*this.charge*node.charge)/Math.pow(d,2);
        var v = [pos2.left-pos1.left, pos2.top-pos1.top];
        v = v.map(function(x) { return x / d; });
        v = v.map(function(x) { return x*magn*(-1); });
        // if (d < 2*this.radius + 10)return v.map(function(x) { return x*5; });;
        return v;
        


    }
    hookRepelling(node){
        var pos1 = copy(this.pos);
        var pos2 = copy(node.pos);
        this.centralize_points(pos1,this.parent.radius);
        this.centralize_points(pos2,this.parent.radius);
        var d = this.distance(pos1,pos2);
        
        var magn = this.hook_const * ( d - this.length );
        var v = [pos2.left-pos1.left, pos2.top-pos1.top];
        v = v.map(function(x) { return x / d; });
        v = v.map(function(x) { return x*magn; });
        
        return v;
        
    }

    startAnimation(range){



    }

    staticForce(){
        var pos2 = $(this.stat).offset();
        var parent = $(this.parent.parent).offset();
        pos2.left = pos2.left - parent.left;
        pos2.top = pos2.top - parent.top;
        var pos1 = copy(this.pos);
        this.centralize_points(pos1,this.parent.radius);
        this.centralize_points(pos2,this.parent.radius);
        var d = this.distance(pos1,pos2);
        var magn = this.hook_const *5* ( this.static_radius );
        var v = [pos2.left-pos1.left, pos2.top-pos1.top];
        v = v.map(function(x) { return x / d; });
        v = v.map(function(x) { return x*magn; });
        
        return v;
    }
    applyMoves(){
        console.log(this.pos.left);
        this.el.css({"left":this.pos.left,"top":this.pos.top});
    }
    calculateForces(nodes,mouseX,mouseY){
        this.col_const/=time;
        this.hook_const/=time;
        this.finish = false;
        var vectors = [];
        // return [0.1,0.1];
        for(var i=0;i<nodes.length;i++){
            if(nodes[i]==this)continue;
            if(this.hasEdge(nodes[i])){
                vectors.push(this.hookRepelling(nodes[i]));
            }
            else{
                
                vectors.push(this.coloumbAttraction(nodes[i]));
            }
        }
        
        var resulting = [0,0];
        
        for(var i=0;i<vectors.length;i++){
            resulting[0] += vectors[i][0];
            resulting[1] += vectors[i][1];
        }
       
       
        if(this.stat!=undefined){
            var statforce = this.staticForce();
            resulting[0]+=statforce[0];
            resulting[1]+=statforce[1];
        }
        
        // console.log(resulting);
        this.testStop(resulting);
        this.prev[0] = resulting[0];
        this.prev[1] = resulting[1];
        // alert(resulting);
        return resulting;
        
    }
    mouseForce(x,y){
        var pos1 = this.el.position();
        var pos2 = {left:x,top:y};
        this.centralize_points(pos1,this.parent.radius);
        this.centralize_points(pos2,this.parent.radius);
        var d = this.distance(pos1,pos2);
        // if (d > 2*this.parent.radius)return [0,0];
        if(d<this.parent.radius/2)return [0,0];
        var v = [pos1.left - pos2.left, pos1.top-pos2.top];
        var magn = (this.col_const*this.charge*this.mouse_charge)/Math.pow(d,2);
        v = v.map(function(x) { return x / d; });
        v = v.map(function(x) { return x*magn; });
        return v;
    }
    testStop(resulting){
        
        if(this.magnitude(resulting) < 0.1){
            console.log(resulting);
            resulting[0] = 0;
            resulting[1] = 0;
           this.finish = true;
        }
    }
    recover(node,resulting){
        
        var pos1 = this.el.position();
        var pos2 = node.el.position();
        this.centralize_points(pos1,this.parent.radius);
        this.centralize_points(pos2,this.parent.radius);
        var d = this.distance(pos1,pos2);
        var v = [pos2.left-pos1.left, pos2.top-pos1.top]; // direction vector from my node to colliding one
        var vdotres = this.dot(resulting,v);
        v[0] = v[0]/d;
        v[1] = v[1]/d;
        if(vdotres <= 0)return; // Force will autmatically resolve the collision
        resulting[0] = 10*(resulting[0] - v[0]);
        resulting[1] = 10*(resulting[1] - v[1]);
       

    }
    iscollision(node){
        var pos1 = this.el.position();
        var pos2 = node.el.position();
        this.centralize_points(pos1,this.parent.radius);
        this.centralize_points(pos2,this.parent.radius);
        var d = this.distance(pos1,pos2);
        if(d < this.parent.radius)return true;
        return false;

    }
    findangle(p1,p2){
        var v = [p2.left-p1.left, p2.top-p1.top]; // Defined first vector
        var i = [1,0]; // I head Vector
        var dp1 = this.magnitude(v);
        var dp2 = this.magnitude(i);
        var product = this.dot(v,i);
        var cos_angle = (product)/(dp1*dp2);
        var angle= Math.acos(cos_angle) * 57.2958;
        if (p1.top > p2.top)angle = 360 - angle;
        return angle;

    }
    moveElement(vector){
        // console.log(this.left + vector[0] + "AND "+ this.parent.offsetWidth);
        if(this.pos.left + vector[0] >= 0 && this.pos.left + vector[0] <= this.parent.parent.offsetWidth-this.parent.radius){
            this.pos.left += vector[0];
        // this.el.css("left",this.left);
    }   
        else if(this.pos.left + vector[0] > this.parent.parent.offsetWidth-this.parent.radius){
            this.pos.left = this.parent.parent.offsetWidth-this.parent.radius
        }
        else if(this.pos.left + vector[0] < 0){
            this.pos.left = 0;
        }
        
        if( this.pos.top + vector[1] >= 20 && this.pos.top+vector[1] <= this.parent.parent.offsetHeight - this.parent.radius ){
            this.pos.top += vector[1];
         }
        else if(this.pos.top + vector[1] > this.parent.parent.offsetHeight-this.parent.radius){
            this.pos.top = this.parent.parent.offsetHeight-this.parent.radius;
        }
        else if(this.pos.top + vector[1] < 20){
            this.pos.top =20;
            
        }
       
        
    }
    adjustEdges(nodes){
        var j =0;
        for(var i=0; i <nodes.length;i++){
            if(nodes[i]==this)continue;
            if(this.edges.includes(nodes[i])){
                var node = nodes[i];
                var temp = this.edgelines[j];
                var pos1 = copy(this.pos);
                var pos2 = copy(node.pos);
                this.centralize_points(pos1,this.parent.radius);
                this.centralize_points(pos2,this.parent.radius);
                var d = this.distance(pos1,pos2);
                var angle = this.findangle(pos1,pos2);
                $(temp).css("width",d);
                $(temp).css("left",pos1.left);
                $(temp).css("top",pos1.top);
                $(temp).css({ WebkitTransform: 'rotate(' + angle + 'deg)'});
                j++;

            }

        }

        if(this.staticline!=undefined){
            var temp = this.staticline;
            var pos1 = copy(this.pos);
            var pos2 = $(this.stat).offset();
            var parent = $(this.parent.parent).offset();
            pos2.left = pos2.left - parent.left;
            pos2.top = pos2.top - parent.top;
            this.centralize_points(pos1,this.parent.radius);
            this.centralize_points(pos2,this.static_radius);
            var d = this.distance(pos1,pos2);
            var angle = this.findangle(pos1,pos2);
            $(temp).css("width",d);
            $(temp).css("left",pos1.left);
            $(temp).css("top",pos1.top);
            $(temp).css({ WebkitTransform: 'rotate(' + angle + 'deg)'});

        }
        
    }
    
    hasEdge(node){
        var a = this.edges.includes(node);
        var b = node.edges.includes(this);
        return a || b;
    }
    addEdge(node){
        
        if (this.hasEdge(node))return;
        var pos1 = copy(this.pos);
        var pos2 = copy(node.pos);
        this.centralize_points(pos1,this.parent.radius);
        // console.log("WITNEESS THE CNAHGE");
        this.centralize_points(pos2,this.parent.radius);
        var d = this.distance(pos1,pos2);
        var angle = this.findangle(pos1,pos2);
        var temp = document.createElement("DIV");
        $(temp).addClass("node_line");
        $(temp).css("width",d);
        $(temp).css("left",pos1.left);
        $(temp).css("top",pos1.top);
        $(temp).css({ WebkitTransform: 'rotate(' + angle + 'deg)'});
        this.parent.parent.appendChild(temp);
        this.edges.push(node);
        this.edgelines.push($(temp));
        
    }
    addEdgeNone(node){
      
            if (this.hasEdge(node))return;
            var pos1 = copy(this.pos);
            var pos2 = copy(node.pos);
            this.centralize_points(pos1,this.parent.radius);
            // console.log("WITNEESS THE CNAHGE");
            this.centralize_points(pos2,this.parent.radius);
            var d = this.distance(pos1,pos2);
            var angle = this.findangle(pos1,pos2);
            var temp = document.createElement("DIV");
            $(temp).addClass("node_line");
            $(temp).css("width",0);
            $(temp).css("left",pos1.left);
            $(temp).css("top",pos1.top);
            $(temp).css({ WebkitTransform: 'rotate(' + angle + 'deg)'});
            this.parent.parent.appendChild(temp);
            this.edges.push(node);
            this.edgelines.push($(temp));
            
        
    }
    staticEdge(){
        var pos2 = $(this.stat).offset();
        var parent = $(this.parent.parent).offset();
        pos2.left = pos2.left - parent.left;
        pos2.top = pos2.top - parent.top;
        var pos1 = this.pos;
        this.centralize_points(pos1,this.static_radius);
        this.centralize_points(pos2,this.static_radius);
        var d = this.distance(pos1,pos2);
        var angle = this.findangle(pos1,pos2);
        var temp = document.createElement("DIV");
        $(temp).addClass("node_line");
        $(temp).css("width",0);
        $(temp).css("left",pos1.left);
        $(temp).css("top",pos1.top);
        $(temp).css({ WebkitTransform: 'rotate(' + angle + 'deg)'});
        this.parent.parent.appendChild(temp);
        this.staticline = $(temp);
        // $(temp).css("animation","linecolour 15s ease infinite");
    }
    run(){
        var temp = document.createElement("DIV");
        this.parent.parent.appendChild(temp);
        $(temp).css("height",this.parent.radius);
        $(temp).css("width",this.parent.radius);
        $(temp).css("background-color",this.parent.bgcolor);
        $(temp).css("font-size",this.parent.radius*0.6);
        $(temp).css("left",this.pos.left);
        $(temp).css("top",this.pos.top);
        $(temp).addClass("floating_node");
        $(temp).html(this.content);
        this.el = $(temp);
        var tmp2 = document.createElement("P");
        tmp2.innerHTML = this.label;
        temp.appendChild(tmp2);
    }

}
