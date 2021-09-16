import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {reqRemoveImg} from '../../../../../api/index'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class picture_Wall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [

    ],
  };
  getImgArr = ()=>{
    let result = []
    this.state.fileList.forEach(item=>{
        result.push(item.name)
    })
    return result
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    // console.log(fileList)
    // console.log(file)
    if (file.status === 'done'){
        console.log(file.response.url)
        fileList[fileList.length-1].url = file.response.url
        fileList[fileList.length-1].name = file.response.filename
        
    }
    if (file.status === 'removed'){
        const result = await reqRemoveImg(file.response.filename)
        console.log(result)
        if (result.data.status === 1) message.error(result.data.msg)
        else message.success(result.data.msg)        
    }
    this.setState({ fileList })
    // fileList[fileList.length-1].url = file.response.url
    // console.log(fileList)
    
  }
//   cusReq = (pic)=>{
//     //   pic.action = "http://localhost:3000/api1/manage/img/upload"
//     //   pic.headers = "Content-Type: multipart/form-data"
//       console.log(pic)
//   }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
            action="http://localhost:3000/api1/manage/img/upload"
            // customRequest={this.cusReq}
            name="imgs-uploaded"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
