import axios from 'axios';
import { setAvatar, setUser} from '../reducers/userReducer';
import { API_URL } from '../config';

export const registration = async (email, password) => {
  try{
    const response = await axios.post(`${API_URL}api/auth/registration`, {
      email,
      password
    })
    alert(response.data.message)
  } catch(e) {
    alert(e.response.data.message)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    try{
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password
      })
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch(e) {
      alert(e?.response?.data?.message)
    }
  }
}

export const auth = () => {
  return async dispatch => {
    try{
      const response = await axios.get(`${API_URL}api/auth/auth`, 
        {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
      )
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch(e) {
      localStorage.removeItem('token')
    }
  }
}

export const uploadAvatar =  (file) => {
  return async dispatch => {
      try {
          const formData = new FormData()
          formData.append('file', file)
          const response = await axios.post(`${API_URL}api/files/avatar`, formData,
              {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
          )
          dispatch(setUser(response.data))
      } catch (e) {
          console.error(e)
      }
  }
}

export const deleteAvatar =  () => {
  return async dispatch => {
      try {
          const response = await axios.delete(`${API_URL}api/files/avatar`,
              {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
          )
          dispatch(setUser(response.data))
      } catch (e) {
          console.error(e)
      }
  }
}

export const fetchAvatar = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/avatar', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                const avatarUrl = response.data; // предполагается, что сервер возвращает URL аватара
                dispatch(setAvatar(avatarUrl));
            } else {
                console.error('Failed to fetch avatar:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching avatar:', error);
        }
    };
};
