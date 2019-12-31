import React, { useState } from 'react';
import useProtectedRoute from '../hooks/useProtectedRoute';
import TopHeader from '../components/TopHeader';
import { FilterContainer, Option, Result } from '../components/FilterResult';
import { Input, Select, Slider, Button, Tabs, Alert } from 'antd';

const { TabPane } = Tabs;

function Tasks() {
  const [category, setCategory] = useState('image');
  const [tab, setTab] = useState('public');
  useProtectedRoute(auth => !auth);

  return (
    <>
      <TopHeader />
      <FilterContainer>
        <Option>
          <div>
            <h3>Search</h3>
            <Input size="large" placeholder="Search" />
          </div>
          <div style={{ marginTop: '3rem' }}>
            <h3>Category</h3>
            <Select size="large" value={category} style={{ width: '100%' }} onChange={value => setCategory(value)}>
              <Select.Option value="image">Image</Select.Option>
              <Select.Option value="video">Video</Select.Option>
              <Select.Option value="voice">Voice</Select.Option>
              <Select.Option value="data">Data</Select.Option>
              <Select.Option value="sensor">Sensor</Select.Option>
            </Select>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <h3>Tags</h3>
            <Select placeholder="Select some options" mode="multiple" size="large" style={{ width: '100%' }}>
              <Select.Option value="animals">Animals</Select.Option>
              <Select.Option value="fauna">Fauna</Select.Option>
            </Select>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <h3>Price</h3>
            <Slider range defaultValue={[0, 1]} min={0} max={1.5} step={0.01} />
          </div>
        </Option>
        <Result>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Search Results</h3>
            <Button type="primary" size="large">CREATE TASK</Button>
          </div>
          <Tabs activeKey={tab} onChange={key => setTab(key)}>
            <TabPane tab="PUBLIC TASKS" key="public">
              <Alert message="No data has been found!" type="warning" />
            </TabPane>
            <TabPane tab="MY TASKS" key="my">
              <Alert message="No data has been found!" type="warning" />
            </TabPane>
          </Tabs>
        </Result>
      </FilterContainer>
    </>
  )
}

export default Tasks;