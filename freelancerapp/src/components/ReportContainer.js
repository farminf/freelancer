import React, { Component } from 'react';
import MainContainer from './MainContainer'
import PanelWrapper from './PanelWrapper'
import APIHelper from "../util/APIHelper";
import Datetime from 'react-datetime';
import ReactDOM from 'react-dom';
import DataTable from './DataTable';



class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            items:[]
		};

        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.handleClickFilterByProject = this.handleClickFilterByProject.bind(this)
        this.handleClickFilterByTime = this.handleClickFilterByTime.bind(this)

    }

    componentWillMount() {
        this.updateItems();
        this.updateProjects();
    }

    componentDidMount() {

    }

    updateItems(){
        APIHelper.getItems()
        .then(function(result){
	    		this.setState({
	    			items : result.data.result	
	    		})
	    	}.bind(this))
    }

    updateProjects(){
        APIHelper.getProjects()
        .then(function(result){
	    		this.setState({
	    			projects : result.data.result	
	    		})
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

    handleClickFilterByProject(){
        var selected_project = ReactDOM.findDOMNode(this.select).value;
        APIHelper.getByProject(selected_project)
        .then(function(result){
	    		this.setState({
	    			items : result.data.result	
	    		})
	    	}.bind(this))
    }

    handleClickFilterByTime(){
        APIHelper.getByTime(String(this.state.from_value),String(this.state.to_value))
        .then(function(result){
	    		this.setState({
	    			items : result.data.result	
	    		})
	    	}.bind(this))
    }
    
    render() {
        var itemProjectSelectOptions = []
        for(var i in this.state.projects){
            itemProjectSelectOptions.push(<option>{this.state.projects[i].name}</option>)
        }
        


        return (
            <MainContainer>
                <PanelWrapper header='Report' size='col-sm-12'>
                    <div className="panel-body">
                        <h3>Filtering options</h3>
                        <div className="input-group">
                                <select id="project_select" className="form-control"  ref={select => { this.select = select }}>
                                    {itemProjectSelectOptions}
                                </select>
                            <span className="input-group-btn">
                                <button className="btn btn-success" type="submit" onClick={this.handleClickFilterByProject} >Filter By Project</button>
                            </span>
                        </div>
                        <div className="input-group">    
                                <label >From<Datetime onChange={this.onChangeStartTime} className="dateTimeField"/></label>
                                <label>To<Datetime onChange={this.onChangeEndTime} className="dateTimeField"/></label>
                            <span className="input-group-btn">
                                <button className="btn btn-success" type="submit" onClick={this.handleClickFilterByTime} >Filter By Time</button>
                            </span>
                        </div>
                    </div>
                    <DataTable  dataArray={this.state.items}/>
                </PanelWrapper>

            </MainContainer>
        );
    }
}

ReportContainer.propTypes = {

};

export default ReportContainer;