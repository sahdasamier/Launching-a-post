import {createSlice } from '@reduxjs/toolkit';

 export const todoSlice = createSlice({
	name: 'toposts',
	initialState: [{
        id: 1,
        title: "the proud rose ",
        body:"Once upon a time, in a desert far away, there was a rose who was so proud of her beautiful looks. Her only complaint was growing next to an ugly cactus  every day, the beautiful rose would insult and mock the cactus on his looks, all while the cactus remained quiet. All the other plants nearby tried to make the rose see sense, but she was too swayed by her own looks.One scorching summer, the desert became dry, and there was no water left for the plants. The rose quickly began to wilt. Her beautiful petals dried up, losing their lush color.Looking to the cactus, she saw a sparrow dip his beak into the cactus to drink some water. Though ashamed, the rose asked the cactus if she could have some water. The kind cactus readily agreed, helping them both through the tough summer as friends.",
        like:"false",

    },
    {
      
      id: 2,
      title: "the golden egg ",
      body:"Once upon a time, a farmer had a goose that laid one golden egg every day. The egg provided enough money for the farmer and his wife to support their daily needs. The farmer and his wife continued to be happy for a long time. But, one day, the farmer thought to himself, “Why should we take just one egg a day? Why can’t we take them all at once and make a lot of money?” The farmer told his wife his idea, and she foolishly agreed.Then, the next day, as the goose laid its golden egg, the farmer was quick with a sharp knife. He killed the goose and cut its stomach open, in the hopes of finding all its golden eggs. But, as he opened the stomach, the only thing he found was guts and blood. The farmer quickly realized his foolish mistake and proceeded to cry over his lost resource. As the days went on, the farmer and his wife became poorer and poorer. How jinxed and how foolish they were.",
      like:"false",
    },
    {
        id: 3,
        title: "the dog at the wall",
        body:"A mother dog and her pups lived on a farm. On the farm, there was a well. The mother dog always told her pups never to go near or play around it.One day, one of the pups was overcome by curiosity and wondered why they weren’t allowed to go near the well. So, he decided he wanted to explore it.He went down to the well and climbed up the wall to peek inside. In the well, he saw his reflection in the water but thought it was another dog. The little pup got angry when his reflection was imitating him, so he decided to fight it. The little pup jumped into the well, only to find there was no dog. He began to bark and bark until the farmer came to rescue him. The pup had learned his lesson and never went back to the well again.",
        like:"false",

    },
   ],
    reducers:{
      addTopost :(state , action)=>{
         const newTopost ={
             id:Date.now(),
             title:action.payload.title,
             body:action.payload.body,
            
         };
        state.push(newTopost);
      },

    deleteTopost : (state, action) => {
			return state.filter((topost) => topost.id !== action.payload.id);
		}, 
  },
});



export const {
    addTopost,
    deleteTopost
} = todoSlice.actions;


export default todoSlice.reducer;