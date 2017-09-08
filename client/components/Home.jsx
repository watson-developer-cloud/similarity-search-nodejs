const React = require('react');
const $ = require('jquery');
const { Header, Jumbotron, Footer, ImagePicker } = require('watson-react-components');

const SimilarImages = require('./SimilarImages');
const IndividualImage = require('./IndividualImage');
const scrollTo = require('../utilities/scrollTo');
const Api = require('../utilities/api');

const sampleImages = [0, 1, 2, 3].map((_, i) => {
  return {
    url: `/images/samples/${i}.png`,
    alt: `Sample-${i}`,
  };
});

module.exports = React.createClass({
  getInitialState() {
    return {
      loading: false,
      imagesShown: 15,
    };
  },

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollEvent);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollEvent);
  },

  // infinite scrolling reveals more results
  onScrollEvent(event) {
    const target = event.srcElement || event.target;
    const bodyHeight = target.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop >= bodyHeight - windowHeight && !this.state.loading) {
      this.setState({ imagesShown: this.state.imagesShown + 15 });
    }
  },

  onClickTile(image, index) {
    this.onClassify(sampleImages[index]);
  },

  onClassify(image, errorType) {
    this.setState({ imagesShown: 15 });
    Api.findSimilar(image)
    .done((data) => {
      this.setState({ data, loading: false, error: null, fileError: null, urlError: null });
    })
    .fail((error) => {
      let errorMessage = 'There was a problem with the request, please try again';
      if (error.responseJSON && error.responseJSON.error) {
        errorMessage = error.responseJSON.error;
      }
      this.onError(error.status === 0 ? null : errorMessage, errorType);
      this.setState({
        loading: false,
        data: null,
      });
    });

    this.setState({
      loading: true,
      error: null,
      fileError: null,
      urlError: null,
      similarImage: null,
      selectedImage: image,
    });
    scrollTo('.similar-images');
  },

  onDropAccepted(image) {
    const formData = new FormData();
    formData.append('image', image);
    this.onClassify(formData);
    $('.dropzone').removeClass('dropzone_on-drag');
  },

  onDropRejected(image) {
    if (image.type !== 'image/png' &&
        image.type !== 'image/x-png' &&
        image.type !== 'image/jpeg' &&
        image.type !== 'image/jpg' &&
        image.type !== 'image/gif') {
      this.onError('Only JPGs, PNGs, and GIFs are supported', 1);
    }
    if (image.size > 2000000) {
      this.onError('Ensure the image is under 2mb', 1);
    }
    $('.dropzone').removeClass('dropzone_on-drag');
  },

  onUrlSubmit(url) {
    this.onClassify(url, 2);
  },

  onClosePreview() {
    this.setState({
      data: null,
    });
  },

  onGoBackClick() {
    this.setState({ similarImage: null });
  },

  onSimilarImageClick(image) {
    this.setState({ similarImage: image });
  },

  onRevealMoreImages() {
    let moreImages = this.state.imagesShown + 15;
    if (moreImages > 100) {
      moreImages = 100;
    }
    this.setState({ imagesShown: moreImages });
  },

  /**
   * errorType is 0, 1, or 2, where 0 = error, 1 = fileError, 2 = urlError
   */
  onError(errorMessage, errorType) {
    if (typeof errorType === 'undefined') {
      errorType = 0;
    }
    this.setState({
      error: errorType === 0 ? errorMessage : null,
      fileError: errorType === 1 ? errorMessage : null,
      urlError: errorType === 2 ? errorMessage : null,
    });
  },

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Header
          mainBreadcrumbs="Visual Recognition"
          mainBreadcrumbsUrl="http://www.ibm.com/watson/developercloud/visual-recognition.html"
          subBreadcrumbs="Similarity Search"
          subBreadcrumbsUrl="https://similarity-search-demo.mybluemix.net"
        />
        <div style={{
          position: 'absolute',
          bottom: '50%',
          left: 0,
          right: 0,
          margin: 'auto',
          alignItems: 'center',
          display: 'flex',
          paddingLeft: '15px',
          paddingRight: '15px',
          flexDirection: 'column',}}>
            <h3 style={{color: '#511687', font: 'bold'}}>Similarity Search is no longer available.</h3>
            <p>The beta period for Similarity Search has now closed. Additional information can be found <a href="https://www.ibm.com/blogs/bluemix/2017/08/visual-recognition-api-similarity-search-update/"> here</a> </p>
        </div>
        <div style={{position: 'absolute', right: 0, bottom: 0, left: 0}}>
          <Footer />
        </div>
      </div>
    );
  },
});
