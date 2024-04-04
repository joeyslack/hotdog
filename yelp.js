const search = (params) => {
  return fetch(`https://api.yelp.com/v3/businesses/search?latitude=${params.latitude}&longitude=${params.longitude}&sort_by=distance&limit=20&categories=hotdog,hotdogs`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${ process.env.EXPO_PUBLIC_YELP_API_KEY }`,
      'Accept': 'application/json',
    },
  }).then(response => response.json())
  .then(data => data);
}

export default search;