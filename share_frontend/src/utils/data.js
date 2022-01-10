export const userQuery = (userId)=>{
const query = `*[_type == "user" && _id == '${userId}']`
return query;
}
export const categories = [
  {
    name: 'toy',
    image: 'https://image.shutterstock.com/image-vector/toys-logo-vector-template-bear-260nw-1019682181.jpg',
  },
  {
    name: 'shoe',
    image: 'https://image.winudf.com/v2/image1/Y29tLnNob2VzbG9nb2lkZWFzLmhmemluY19zY3JlZW5fMF8xNTg5ODg0NzIxXzAxMA/screen-0.jpg?fakeurl=1&type=.jpg',
  },
  {
    name: 'dress',
    image: 'https://i5.walmartimages.com/asr/911fa45b-3c55-45e1-8794-0cbd58a422a4_1.ba97bc3e8fbebde41437b3042b273056.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
  },
  {
    name: 'perfume',
    image: 'https://image.shutterstock.com/image-vector/perfume-logo-260nw-695964418.jpg',
  },

  {
    name: 'food',
    image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
  },
  {
    name: 'art',
    image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  },
   {
    name: 'cats',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  }, {
    name: 'dogs',
    image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
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
      price,
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
        price,
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
        price,
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
    price,
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
    price,
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
    price,
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