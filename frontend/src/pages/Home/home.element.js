import styled from 'styled-components';
import {Container} from "../../globalStyles";


export const BodyPic = styled.div`
    width: 100%; 
    height: 50vh; 
   .pic{
       width: 100%;
       height: 100%;
       object-fit: cover;
   }
`;

export const Info = styled.div`
    width: 100%;
    background: #F0F2F1;
    min-height: 400px;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
    overflow: visible;
    border: 20px;
`

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  width: 90%;

`;

export const InfoSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    flex-wrap: wrap;
    gap: 10px;
`;

export const InfoItem = styled.div`
  z-index: 2 !important;
  color: black;
  font-size: 22px;
  width: 300px;
  height: 120px;
  background: #fff;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  top: 180px;
  left: 0px;
  transition: top 0.3s ease-in-out;

  p {
    color: #b4b4b4;
    font-size: 15px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .title {
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    color: black;
    font-size: 17px;
  }
`;


export const InfoPic = styled.div`
  position: absolute;
  z-index: 3 !important;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background: #00D3D6;
  padding-left: 10px;
  .pic{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s;
     &:hover{
      transform: scale(1.4);
    }
  }
`;

export const InfoWrapper = styled.div`
  font-size: 22px;
  width: 300px;
  overflow: visible;
  background: #000;
  border-radius: 10px;
  position: relative;
  margin-bottom: 280px;
  cursor: pointer;
  transition: all 0.5s ease; 
    &:hover {
        transform: translateY(-10px); 
    }

  // &:hover ${InfoItem} {
  //   top: 180px; /* Di chuyển từ 80px lên 180px khi hover */
  //   transition: top 0.3s ease-in-out; /* Thêm hiệu ứng chuyển động */
  // }

  // &:hover ${InfoPic} {
  //   background: #2197E3;
  // }
`;

export const News = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  overflow: visible;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
export const NewsHeader = styled.p`
  color: #008285;
  font-size: 1.8rem;
  
  .lower-header{
    color: #B4B4B4;
    font-size: 1.6rem;
    margin-top: 10px;
  }
`;

export const NewsHeaderWrapper = styled.div`
  width: 80%;
`;

export const NewsSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    flex-wrap: wrap;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
`;

export const NewItem1 = styled.div`
  color: black;
  font-size: 22px;
  width: 49%;
  margin-top: 15px;
  height: 550px;
  background: #fff;
  cursor: pointer;
  border: 2px solid #f0f1f2;
  transition: all 0.5s ease; 
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 0 20px #9e9e9e; 
    }
  p{
    color: #B4B4B4;
    font-size: 15px;
  }
  .title{
    color: black;
    font-size: 20px;
    margin-bottom: 5px;
    margin-left: 10px;
  }
  .content1{
    font-weight: 500;
    font-size: 1.4rem;
    color: #b4b4b4;
    margin: 10px;
    line-height: 1.8rem;
    height: 3.6rem;
    overflow: hidden;
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const NewPicItem1 = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  .pic{
    width: 100%;
    height: 100%;
    transition: all ease 0.8s;
    &:hover{
       transform: scale(1.2);
    }
  }
`;


export const NewItem2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-between;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const NewPicAndContent = styled.div`
  display: flex;
`;
export const NewPicItem2 = styled.div`
    width: 200px;
    height: 100px;
    margin: 20px;
    display: flex;
    .pic2 {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const NewsTitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  flex: 1; // nay giup cho kich thuoc anh khong bi anh huong boi content
 
  .title{
    color: #2197E3;
    font-size: 1.6rem;
  }
  .content{
    font-weight: 500;
    font-size: 1.4rem;
    color: #b4b4b4;
    margin: 10px;
    line-height: 1.8rem;
    height: 5.4rem;
    overflow: hidden;
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow-wrap: break-word;
  }
`;
export const NewsButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const NewButton = styled.button`
  color: white;
  background: #00D3D6;
  width: 180px;
  height: 50px;
  margin-top: 10px;
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all ease 0.8s;
  &:hover{
     color: #00D3D6;
     background-color: #fff;
     border: 2px solid #00D3D6;
     transform: scale(1.2);
     box-shadow: 0 0 20px #9e9e9e;
  }
  //position: absolute; left: 50% ; top: 50%; transform: translateX(-50%) translateY(-50%)
`;

