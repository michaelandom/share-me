import saintyClinet from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client=saintyClinet({
projectId:process.env.REACT_APP_SANITY_PROJECT_ID,
dataset:'production',
apiVersion:"2021-11-24",
useCdn:true,
token:process.env.REACT_APP_SANITY_API_TOKEN,

})

const builder=imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

