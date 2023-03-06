const mockGeneratedTexts = [
  "Looking to help your body  lose weight in a healthy way? Check out our delicious weight loss products! Made with only the finest ingredients, they're a great way to help you reach their diet goals. Try them today and see the difference!",
  "Looking to help your little one lose weight in a healthy way? Try our new weight loss line of products! They're perfect for those who want to help their body stay healthy and have more energy.",
  "Looking to slim down? Check out our delicious line-up of weight loss products! With our help, you'll be on your way to your ideal weight in no time!",
  "Looking to slim down? Check out our amazing line of weight loss products! Tasty and healthy, they're sure to help you reach your goals. Shop today and start seeing results!",
  'Looking to cut down on calories and live a healthier lifestyle? Look no further than our delicious weight loss products! Our meals are designed to help you lose weight quickly and easily, without sacrificing flavor. Come see us today and see the difference our products can make!',
  'Looking to slim down? Look no further than our delicious weight loss products! Our unique blend of flavors will keep you satisfied while you lose weight. Try today and see the results for yourself!',
  "Looking to finally lose weight and get in shape? Look no further than our set of delicious weight loss products! Our products are specially formulated to help you achieve your weight loss goals, and they're so tasty you'll never even notice you're on a diet!",
  'Looking to slim down without giving up all your favorite foods? Try these delicious weight-loss products! With a range of options to choose from, you can find the perfect fit for your taste and lifestyle. So ditch those fad diets and start shedding pounds the healthy way with our tasty weight-loss products!',
  'Hi, Looking to drop a few pounds? Check out our amazing weight loss products! Our delicious, all-natural snacks will help you reach your goals in no time. With no sugar and no artificial ingredients, our snacks are perfect for anyone on a weight loss journey. Give us a try and see for yourself how great our snacks can be!',
  'Do you want to lose weight and feel great? Try our new weight loss products! Our products are designed to help you lose weight quickly and easily. They are tasty and nutritious, and they will help you reach your weight loss goals. Try our products today and see the difference!',
  'Looking to shred those unwanted pounds? Look no further than our delicious weight-loss products! Our set includes a variety of flavors to help keep your taste buds satisfied while you lose weight. So start your journey to a healthy you today with our delicious weight-loss products!',
];

export const mockGetRandomTextUtil = (): Array<string> => {
  let arrayElemsNumber = mockGeneratedTexts.length;
  const copyTexts = Object.assign([], mockGeneratedTexts);
  const array = [];

  for (let i = 0; i < 5; i++) {
    const elem = copyTexts.splice(Math.floor(Math.random() * arrayElemsNumber--), 1);
    array.push(elem[0]);
  }

  return array;
};
