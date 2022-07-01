import React, { Component } from 'react';
import './App.css';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid text-monospace main">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
            <div className="col-md-9">
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '1920px',maxWidth: '1080px',marginTop: '20px'}}>
                <video
                  src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                  controls
                >
                </video>
                
              </div>
            <h3 className="mt-3"><b><i className="video-title">{this.props.currentTitle}</i></b></h3>
            <br></br>
            <br></br>
            <h4>New Upload:</h4>
            <br></br>
            <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.videoTitle.value
              this.props.uploadVideo(title)
            }} >
              &nbsp;
              <input type='file' accept=".mp4, .mov, .mkv .ogg .wmv" onChange={this.props.captureFile} class="uploadfile"/>
                <div className="form-group mr-sm-2">
                  <br></br>
                  <label style={{margin:'10px 0 0 0', float: 'left'}}>Title:</label>
                  <br></br>
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { this.videoTitle = input }}
                    className="form-control-sm mt-3 mr-3"
                    required />
                </div>
              <button type="submit" className="btn border border-dark btn-primary btn-block btn-sm">Upload</button>
              &nbsp;
            </form>
          </div>
          <div className="vide-feed col-md-2 overflow-auto text-center" style={{ maxHeight: '1020px', minWidth: '305px' , marginTop: '20px', marginRight: '40px'}}>
            <h5 className="feed-title"><b>Video Feed</b></h5>
            <br></br>
            { this.props.videos.map((video, key) => {
              return(
                  <div className="card mb-4 text-center hover-overlay bg-secondary mx-auto" style={{ width: '195px'}} key={key} >
                    <div className="card-title bg-dark">
                      <small className="text-white"><b>{video.title}</b></small>
                    </div>
                    <div>
                      <p onClick={() => this.props.changeVideo(video.hash, video.title)}>
                        <video
                          src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                          style={{ width: '170px' }}
                        />
                      </p>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
