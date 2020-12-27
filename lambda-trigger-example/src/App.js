import React, { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import {v4 as uuid } from 'uuid'
import './App.css';

function App() {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchImages()
  }, [])

  async function onChange(e) {
    const file = e.target.files[0]
    const filetype = file.name.split('.')[file.name.split.length - 1]
    await Storage.put(`${uuid()}.${filetype}`, file)
    fetchImages()
  }

  async function fetchImages() {
    const files = await Storage.list('')
    const signedFiles = await Promise.all(files.map( async file => {
      const signedFile = await Storage.get(file.key)
      return signedFile
    }))
    setImages(signedFiles)
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="file"
          onChange={onChange}
        />
        {
          images.map(image => (
            <img
              src={image}
              key={image}
              style={{ width: 500 }}
            />
          ))
        }
      </header>
    </div>
  );
}

export default App;
