import React, { Component } from 'react';
import MainContainer from './MainContainer'
import PanelWrapper from './PanelWrapper'
import APIHelper from "../util/APIHelper";
import Datetime from 'react-datetime';
import ReactDOM from 'react-dom';
import DataTable from './DataTable';

class InsertContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
			projects: [],
            items:[],
            project_input:''
		};
        this.updateInputValueProject = this.updateInputValueProject.bind(this);
        this.handleClickAddProject = this.handleClickAddProject.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.handleClickItemCreate = this.handleClickItemCreate.bind(this)
    }

    componentWillMount() {
        this.updateProjects();
        this.updateItems();
    }

    componentDidMount() {

    }

    updateProjects(){
        APIHelper.getProjects()
        .then(function(result){
	    		this.setState({
	    			projects : result.data.result	
	    		})
	    	}.bind(this))
    }

    updateItems(){
        APIHelper.getItems()
        .then(function(result){
	    		this.setState({
	    			items : result.data.result	
	    		})
	    	}.bind(this))
    }

    updateInputValueProject(evt){
        this.setState({
	        project_input : evt.target.value
	    })
    }

    handleClickAddProject(){
        //TODO error handling here
        var input = this.state.project_input
        APIHelper.postProject(input)
        .then(function(result){
            this.updateProjects()
        }.bind(this))
    }

    onChangeStartTime(m){
        this.setState({
            from_value : m.unix()
        })
    }
    onChangeEndTime(m){
        this.setState({
            to_value : m.unix()
        })
    }

    handleClickItemCreate(){
        //TODO error handling here
        var selected_project = ReactDOM.findDOMNode(this.select).value;
        APIHelper.postItem(selected_project , String(this.state.from_value) , String(this.state.to_value))
        .then(function(result){
            this.updateItems()
        }.bind(this))
    }
    
    render() {
        var projectsContent = []
        var itemProjectSelectOptions = []
        for(var i in this.state.projects){
            projectsContent.push(<tr><td>{this.state.projects[i].name}</td></tr>)
            itemProjectSelectOptions.push(<option>{this.state.projects[i].name}</option>)
        }
        

        return (
            <MainContainer>
                <PanelWrapper header='Insert Item' size='col-sm-9'>
                    <div className="panel-body">
                        <div className="input-group">
                            <label htmlFor="project_select">Select Project
                            <select id="project_select" className="form-control"  ref={select => { this.select = select }}>
                                {itemProjectSelectOptions}
                            </select>
                            </label>
                            <label >From<Datetime onChange={this.onChangeStartTime} className="dateTimeField"/></label>
                            <label>To<Datetime onChange={this.onChangeEndTime} className="dateTimeField"/></label>
                            <span className="input-group-btn">
                                <button className="btn btn-success" type="submit" onClick={this.handleClickItemCreate} >Add New Item</button>
                            </span>
                        </div>
                            
                    </div>
                    <DataTable  dataArray={this.state.items}/>
                </PanelWrapper>
                

                <PanelWrapper header='Insert Project' size='col-sm-3'>
                    <div className="panel-body">
                        
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Insert new Project"  onChange={this.updateInputValueProject} />
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="submit" onClick={this.handleClickAddProject} >Add</button>
                            </span>
	                    </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Project Names</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsContent}
                        </tbody>
                    </table>
                </PanelWrapper>
            </MainContainer>
        );
    }
}

InsertContainer.propTypes = {

};

export default InsertContainer;