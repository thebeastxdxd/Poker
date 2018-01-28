import React from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { uploadAvatar} from '../actions/index';
import {assign, isEmpty} from 'lodash';
import '../Avatar.css'

function getBase64(img) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  return reader
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';

  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG  && isLt2M;
}


class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false
        };
    }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      
      return;
    }
    if (info.file.status === 'error'){
        this.setState({loading:false})
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  onUpload =({file, onSuccess}) => {
        const reader = getBase64(file)
        reader.onload = (...args) => {
            let filecontents = {'image':reader.result }
            let requestUser = !isEmpty(this.props.user) ? this.props.user : {'user' :{'userName' : 'a'}}
            let requestData = {...requestUser.user, filecontents}

            this.props.uploadAvatar(requestData)

            onSuccess('done', file)
        }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        customRequest={this.onUpload}
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={(e) => this.handleChange(e)}
      >
        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
      </Upload>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}



export default connect(mapStateToProps, {uploadAvatar})(Avatar);