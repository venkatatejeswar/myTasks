import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Mytask extends Component {
  state = {
    tasksList: [],
    taskName: '',
    tagName: tagsList[0].displayText,
    activeTag: '',
  }

  onAddTask = event => {
    this.setState({taskName: event.target.value})
  }

  onSelectTag = event => {
    this.setState({tagName: event.target.value})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {taskName, tagName} = this.state
    const tag = tagsList.find(each => each.optionId === tagName)
    const taskObj = {id: v4(), name: taskName, tag: tag.displayText}
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, taskObj],
      taskName: '',
      tagName: tagsList[0].optionId,
    }))
  }

  onActiveTag = event => {
    const {activeTag} = this.state
    const curentTag = event.currentTarget.value
    if (activeTag === curentTag) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: curentTag})
    }
  }

  render() {
    const {tasksList, taskName, tagName, activeTag} = this.state
    let tasks = tasksList
    if (activeTag !== '') {
      tasks = tasksList.filter(each => activeTag === each.tag)
    }
    return (
      <div className="bg_container">
        <form className="create_container" onSubmit={this.onSubmitTask}>
          <h1 className="title">Create a task!</h1>
          <div className="input_container">
            <label htmlFor="task" className="task_title">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="input"
              placeholder="Enter the task here"
              onChange={this.onAddTask}
              value={taskName}
            />
          </div>
          <div className="input_container">
            <label className="task_title" htmlFor="tags">
              Tags
            </label>
            <select
              className="input"
              id="tags"
              onChange={this.onSelectTag}
              value={tagName}
            >
              {tagsList.map(tag => (
                <option key={tag.optionId} value={tag.optionId}>
                  {tag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button className="custom_btn" type="submit">
            Add Task
          </button>
        </form>

        <div className="tags_container">
          <h1 className="tag_title">Tags</h1>
          <ul className="button_list">
            {tagsList.map(btn => (
              <li key={btn.optionId}>
                <button
                  key={btn.optionId}
                  type="button"
                  className={
                    activeTag === btn.displayText ? 'active_tag' : 'tag_button'
                  }
                  value={btn.displayText}
                  onClick={this.onActiveTag}
                >
                  <p className="tagBtn">{btn.displayText}</p>
                </button>
              </li>
            ))}
          </ul>
          <h1 className="tag_title">Tasks</h1>
          <div className="tasks_cont">
            {tasks.length !== 0 ? (
              <ul className="tasks_list">
                {tasks.map(task => (
                  <li className="task_item" key={task.id}>
                    <p className="task_name">{task.name}</p>
                    <div className="task_tag">
                      <p className="task_tagname">{task.tag}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no_tasks">
                <p>No Tasks Added Yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Mytask
