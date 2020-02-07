import React, { useState } from 'react';
import Head from 'next/head';
import { getTaskByID } from '../../services/tasks';
import moment from 'moment';
import './style.scss';
import TopHeader from '../../components/TopHeader';

function Task({ task }) {
  console.log({ task });
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/css/task.css" />
      </Head>
      <TopHeader title="task" />
      <div className="task-box-signed task-box">
        <div className="task-info">
          <div className="task-title">
            <h1>{task.title}</h1>
          </div>
          <div className="task-description">
            <ul className="task-icons">
              <li>
                <span className="ti-timer"> {moment(task.deadline, 'YYYY-MM-DD').format('MMM. DD, YYYY')}</span>
              </li>
              <li>
                <span className="ti-layers-alt"> 0 left</span>
              </li>
              <li>
                <strong> ${task.price_per_datum.toFixed(2)}/datum</strong>
              </li>
            </ul>
            <h3>{task.description}</h3>
          </div>
          <ul className="task-details">
            <li>
              <span className="ti-zip"> {task.extension}</span>
            </li>
            <li>
              <span className="ti-image"> {task.width} X {task.height}</span>
            </li>
            <li>
              <span className="ti-package"> {task.image_type}</span>
            </li>
          </ul>
        </div>
        <div className="task-data-cont"></div>
      </div>
    </>
  )
}

Task.getInitialProps = async ({ query }) => {
  const { id } = query;
  const task = await getTaskByID(id);
  return { task };
}

export default Task;