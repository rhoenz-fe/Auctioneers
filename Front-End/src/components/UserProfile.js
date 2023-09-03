import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    // Fetch user profile data here (if needed)
    // Update the state with fetched data
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('image', image);

    try {
      let response;
      if (profileId) {
        response = await axios.put(`/api/profiles/${profileId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post('/api/profiles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('Profile saved:', response.data);
      // You can add logic here to handle success or display a message
    } catch (error) {
      console.error('Error saving profile:', error);
      // You can add logic here to handle error or display an error message
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const response = await axios.delete(`/api/profiles/${profileId}`);
        console.log('Profile deleted:', response.data);
        // You can add logic here to handle success or display a message
      } catch (error) {
        console.error('Error deleting profile:', error);
        // You can add logic here to handle error or display an error message
      }
    }
  };

  return (
    <div>
      <h2>{profileId ? 'Update' : 'Create'} Your User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Bio:
          <textarea value={bio} onChange={handleBioChange} />
        </label>
        <br />
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">{profileId ? 'Update' : 'Save'} Profile</button>
        {profileId && (
          <button type="button" onClick={handleDelete}>
            Delete Profile
          </button>
        )}
      </form>
    

    </div>
  );
}

export default UserProfile;