import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { categoryBungleList } from "../redux/modules/BungleSlice";

import { CategoryWrap, CategoryItem, CatogoryName, CategoryImgWrap, CategoryImg } from "../styles/StyledCategory";

// category icons
import IconRestarunt from "../assets/icon-category-restaurant.svg";
import IconTravel from "../assets/icon-category-travel.svg";
import IconNorae from "../assets/icon-category-noraebang.svg";
import IconExercise from "../assets/icon-category-excercise.svg";
import IconCaffe from "../assets/icon-category-caffe.svg";
import IconFriendShip from "../assets/icon-category-friendship.svg";
import IconGame from "../assets/icon-category-game.svg";
import IconStudy from "../assets/icon-category-study.svg";
import IconShopping from "../assets/icon-category-shoppin.svg";
import IconExhibit from "../assets/icon-category-exhibit.svg";

const CategoryImgArray = [ IconRestarunt, IconCaffe, IconNorae, IconExercise, IconFriendShip, IconExhibit, IconTravel, IconShopping, IconStudy, IconGame ];
const CategoryArray = ["맛집", "카페", "노래방", "운동", "친목", "전시", "여행", "쇼핑", "스터디", "게임"];

function Category( props ) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { location } = props;
  
  const categoryClickHandler = ( category ) => {
    dispatch( categoryBungleList( { location, category, navigate } ))    
  };

  return (
    <CategoryWrap>
      {CategoryArray.map((item, index) => {
        return (
          <CategoryItem key={index} onClick={()=>{categoryClickHandler(item)}}>
            <CategoryImgWrap>
              <CategoryImg src={ CategoryImgArray[index] }/>
            </CategoryImgWrap>
            <CatogoryName>{item}</CatogoryName>
          </CategoryItem>
        );
      })}
    </CategoryWrap>
  );
}

export default Category