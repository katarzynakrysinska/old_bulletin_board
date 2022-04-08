export const initialState = {
  users: {
    isLogged: true,
    isAdmin: false,
    user: 'Joe Doe',
    userId: '2131234325345'
  },

  posts: {
    data: [
  //   {
  //     id: '1',
  //     author: 'Joe Doe',
  //     created: '2022-03-20',
  //     updated: '2022-03-20',
  //     status: 'published',
  //     title: 'Welcome to our home!',
  //     text: 'Feel the space and beauty of nature!',
  //     photo:
  //       'https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     price: 3500000,
  //     phone: '799699599',
  //     location: 'Warsaw',
  //   },
  //   {
  //     id: '2',
  //     author: 'user1@gmail.com',
  //     created: '2022-03-23',
  //     updated: '2022-03-24',
  //     status: 'published',
  //     title: 'House for sale!',
  //     text: 'Luxury house on a slope',
  //     photo:
  //       'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     price: 5500000,
  //     phone: '699599499',
  //     location: 'Gdynia',
  //   },
  //   {
  //     id: '3',
  //     author: 'user2@gmail.com',
  //     created: '2022-03-24',
  //     updated: '2022-03-24',
  //     status: 'published',
  //     title: 'New house for sale!',
  //     text: 'You will appreciate luxury and modernity',
  //     photo:
  //       'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     price: 6000000,
  //     phone: '599499399',
  //     location: 'Kraków',
  //   },
  //   {
  //     id: '4',
  //     author: 'user3@gmail.com',
  //     created: '2021-12-22',
  //     updated: '2021-12-22',
  //     status: 'published',
  //     title: 'House for sale!',
  //     text: 'An oasis of recreation in the countryside',
  //     photo:
  //       'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     price: 4500000,
  //     phone: '599499399',
  //     location: 'Mrągowo',
  //   },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
};
