import React from 'react';
import TextInput from './TextInput.js';
import VirtualizedSelect from 'react-virtualized-select'
import createFilterOptions from 'react-select-fast-filter-options';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import {Typeahead} from 'react-bootstrap-typeahead';
import DirectorData from './directors.json';
import ActorData from './actors.json';
import ActorOptions from './actorOptions.json';

class UserInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            runtime : '',
            director : '',
            genres : [],
            actors : [],
            poster_url : ''
         }

        this.directorOptions = DirectorData;

        this.genreOptions = [
            { value: "Action",label: "Action"},
            { value: "Adventure",label: "Adventure"},
            { value: "Animation",label: "Animation"},
            { value: "Comedy",label: "Comedy"},
            { value: "Crime",label: "Crime"},
            { value: "Documentary",label: "Documentary"},
            { value: "Drama",label: "Drama"},
            { value: "Fantasy",label: "Fantasy"},
            { value: "Film-Noir",label: "Film-Noir"},
            { value: "Horror",label: "Horror"},
            { value: "Musical",label: "Musical"},
            { value: "Mystery",label: "Mystery"},
            { value: "Romance",label: "Romance"},
            { value: "Sci-Fi",label: "Sci-Fi"},
            { value: "Thriller",label: "Thriller"},
            { value: "War",label: "War"},
            { value: "Western",label: "Western"},
            { value: "(no genres listed)",label: "(no genres listed)"}
        ];

        // need faster indexing
        this.actorOptions = ActorData;
        this.state.actorFasterOptions = createFilterOptions( ActorOptions );

        // console.log(options)

        // ** methods not bound by default in JS -> without bound, 'undefined'
        // ** if method referred without (), need to bind that method
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRuntimeChange = this.handleRuntimeChange.bind(this);
        this.handleDirectorChange = this.handleDirectorChange.bind(this); 
        this.handlePosterChange = this.handlePosterChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleActorChange = this.handleActorChange.bind(this);
        
        
    }

    // ** e is synthetic event
    handleSubmit( e ){
        // ** cannot return false like HTML- use preventDefault()
        e.preventDefault(); 
        console.log(this.state);
        this.props.onSubmit( this.state.runtime, this.state.director, 
            this.state.genres, this.state.actors, this.state.poster_url );
    }

    // => try to handle both events in one method with event.target
    // => see React doc- Forms
    handleRuntimeChange( val ){
        // ** don't modity state directly
        // ** constructor only place where you can assign "this.state" 
        // ** use setState() instead
        this.setState( { runtime : val  } );
        // ** there's another form - setState( function(prevState, props) )
    }

    handlePosterChange( val ){
        this.setState( { poster_url : val } );
    }

    handleDirectorChange(event) {
        if (event.length > 0) {
            //this.props.onChange(..);  Call this.props.onChange with 
            // the selected symbol to propagate it
            // to the App component, which will handle it via its own onChane prop,
            // ultimately  used to fetch the data for the LineChart component.
            // this.props.onChange( event[0] ); // The director name passed to onChange()
            console.log(event);
            // this.handleDirectorChange( event[0] );
            this.setState({ director : event[0] } )
        }
    }

    handleGenreChange( genreList ){
        const tagValues = genreList.map(g => g.value);
        console.log(tagValues);
        this.setState({genres: tagValues});
    }

    handleActorChange( actorList ){
        const tagValues = actorList.map(a => a.value);
        console.log(tagValues);
        this.setState({actors: tagValues});
    }

    render(){
        return(
            <div className="display">
                <div className="input">
                    <h3> Input parameters to predict rating: </h3>                
                    <form className='input-typeahead'>
                        <TextInput name="runtime" label="Runtime"
                            example="194"
                            value={this.state.runtime}
                            onChange={this.handleRuntimeChange}/> 


                        {/* Typeahead */}
                        {/* <TextInput name="director" label="Director"
                            example="James Cameron"
                            value={this.state.director}
                            onChange={this.handleDirectorChange}/> */}
                        
                        <div className="form-group">
                            <label className="control-label">Director</label>
                                <Typeahead
                                    align="left"
                                    labelKey="director"
                                    onChange={this.handleDirectorChange}
                                    minLength={1}
                                    placeholder="Start typing director name..."
                                    options={this.directorOptions}/> 
                        </div>

                        {/* Select */}
                        <div className="form-group">
                            <label className="control-label">Genre</label>
                                <Select options={this.genreOptions} 
                                    multi value={this.state.genres} 
                                    onChange={this.handleGenreChange}/>
                        </div>

                        {/* <div className="form-group">
                            <label className="control-label">Actor</label>
                                <Select 
                                    options={this.actorOptions}
                                    multi value={this.state.actors} 
                                    onChange={this.handleActorChange}/>
                                    
                        </div> */}

                        <div className="form-group">
                            <label className="control-label">Actor</label>
                                <VirtualizedSelect 
                                    // filterOption={actorFasterOptions}
                                    options={this.actorOptions}
                                    multi value={this.state.actors} 
                                    onChange={this.handleActorChange}                                    
                                    />
                        </div>

                        <TextInput name="poster_url" label="Poster URL"
                            example="http://img.moviepostershop.com/titanic-movie-poster-1997-1020339699.jpg"
                            value={this.state.poster_url}
                            onChange={this.handlePosterChange}/>
                        <button className="btn btn-primary"
                            onClick={this.handleSubmit}>Submit</button>

                        {/* Name:
                        <input type="name"></input><br/>
                        Message:
                        <input type="message"></input> */}
                    </form>
                </div>
            </div>
        );
    }
}

export default UserInput;