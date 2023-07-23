import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  {/* 실시간이 아님 : 문서를 한 번 가져오는 방법 */}
  // const fetchTweets = async () => {
  //   const tweetsQuery = query(
  //     collection(db, "tweets"),
  //     orderBy("createdAt", "desc")
  //     // tweets이라는 컬렉션에 있는 정보들을 createdAt 내림차순으로 가져옴
  //   );
    
  //   const snapshot = await getDocs(tweetsQuery);
  //   const tweets = snapshot.docs.map((doc) => {
  //     const { tweet, createdAt, userId, username, photo } = doc.data();
  //     return {
  //       tweet,
  //       createdAt,
  //       userId,
  //       username,
  //       photo,
  //       id: doc.id,
  //     };
  //   });
  //   setTweet(tweets);
  // };

  {/* 실시간 : 쿼리에 리스너를 추가하는 방법 */}
  // onSnapshot은 특정 문서나 컬렉션, 쿼리 이벤트를 감지하여 realtime으로 이벤트 콜백 함수를 실행
  // 이를 통해 db에 들어온 쿼리를 새로고침없이 화면에 반영 가능
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        // onSnapshot : 무언가가 삭제, 편집 또는 생성되었다는 이벤트를 받으면 해당 쿼리의 문서를 돌아봄
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };

    fetchTweets();

    return () => {
      unsubscribe && unsubscribe();
      // onSnapshot은 실행되면서 해당 이벤트 리스닝의 구독을 해제하는 함수를 반환
    };
  }, []);
  // onSnapshot을 사용할 때는 비용을 지불해야하기 때문에 유저가 다른 화면을 보고있으면 작동하지 않게 해주는 것이 좋음
  // useEffect의 cleanup 기능을 이용하여 컴포넌트가 언마운트될 때 (트윗 타임라인 컴포넌트 화면에서 해제될때) onSnapshot이 실행되지 않도록
  // const 변수 선언 및 할당을 해주고, useEffect의 return으로 해당 함수를 실행시키도록 함
  
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
