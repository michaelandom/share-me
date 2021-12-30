export const userQuery = (userId)=>{
const query = `*[_type == "user" && _id == '${userId}']`
return query;
}
export const categories = [
    {
      name: 'The Fashionista Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/115.gif',
    },
    {
      name: 'The Nerdy Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/213.gif',
    },
    {
      name: 'The Hot, Single & Ready to Mingle Girl ',
      image: 'http://cdn.thestorypedia.com/images/2016/07/312.gif',
    },
    {
      name: 'The Mother-Hen Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/411.gif',
    },
    {
      name: 'The Girlfriend Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/514.gif',
    },
    {
      name: 'The Miss Popular Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/611.gif',
    },
    {
      name: 'The Party Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/711.gif',
    },
    {
      name: 'The Super Rich Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/84.gif',
    }, {
      name: 'The Girly Girl',
      image: 'http://cdn.thestorypedia.com/images/2016/07/105.gif',
    },
    {
      name: 'other',
      image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
    },
  ];
  export const pinDetailQuery  = (pinId)=>{
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      } 
    }`
    return query;
    }
    export const pinDetailMorePinQuery = (pin) => {
      const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
      return query;
    };
export const searchQuery = (searchTerm)=>{
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*'  ]{
        image{
            asset ->{
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`
    return query;
    }
export const feedQuery =`*[_type=="pin"] | order(_createdAt desc) {
    image{
        asset ->{
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`;
export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};