import axios from "axios";

const API = axios.create({
    baseURL:`${import.meta.env.VITE_BASE_URL}`
})

export const loginUser = (data) => API.post('user/login',data);

export const logoutUser = () => API.post('user/logout', {
  headers: {
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
  }
});


export const AllUser = () => API.get('user',{
    headers:{
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
}});

export const DeletUser = (id) => API.delete(`user/${id}`,{ 
    headers:{
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const Extension = () => API.get(`extension/get?domainExtension=.net`,{ 
    headers:{
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});



export const ExtensionCreate = (extension_name) => API.post(
    `extension/create/`, 
    { extension_name }, // Wrap extension_name in an object
    { 
      headers:{
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }
  );

  export const ExtensionDelete = (id) => API.delete(`extension/delete/${id}`,{ 
    headers:{
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  }});
  
export const ExtensionEdit = ({editItemId:id,extension_Edit:extension_name}) => API.put(
    `extension/update/${id}`, 
    {extension_name }, 
    { 
      headers:{
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }
  );

  export const Category = () => API.get(`category`,{ 
    headers:{
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const CategoryDelete = (id) => API.delete(`category/delete/${id}`,{ 
  headers:{
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const CategoryCreate = ({fileData:category_image,category_name}) => API.post(
  `category/create`, 
  {category_image,category_name}, // Wrap extension_name in an object
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      'Content-Type': 'multipart/form-data',
    }
  }
);

export const CategoryEdit = ({editItemId:id,fileData:category_image,category_Edit:category_name}) => API.put(
  `category/update/${id}`, 
  {category_image, category_name }, 
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      'Content-Type': 'multipart/form-data',
    }
  }
);


export const currency = () => API.get(`currency/get`,{
  headers:{
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const currencyDelete = (id) => API.delete(`currency/delete/${id}`,{ 
  headers:{
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const currencyCreate = (currency_name) => API.post(
  `currency/create`, 
  { currency_name }, // Wrap extension_name in an object
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  }
);

export const CurrencyEdit = ({editItemId:id,Currency_Edit:currency_name}) => API.put(
  `currency/update/${id}`, 
  {currency_name }, 
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  }
);

export const language = () => API.get(`lang-code/get`,{
  headers:{
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const languageCreate = (language_code) => API.post(
  `lang-code/create`, 
  { language_code }, // Wrap extension_name in an object
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  }
);

export const languageDelete = (name) => API.delete(`lang-code/delete/${name}`,{ 
  headers:{
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const languageEdit = ({oldName,language_code}) => API.put(
  `lang-code/update/${oldName}`, 
  {language_code }, 
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  }
);

export const domain = () => API.get(`domain/get`,{
  headers:{
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const DomainCreate = (data) => API.post(
  `domain/create`, 
   data , 
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  }
);

export const DomainEdit = ({id,EditDomainData}) => API.put(
  `domain/update/${id}`, 
  EditDomainData , 
  { 
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  }
);