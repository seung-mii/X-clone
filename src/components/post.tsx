import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function Post() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
      // input은 여러 개의 파일을 업로드하게 해주는데 이때 파일 하나만 업로드할 수 있도록 함 
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);

      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
        // 나중에 트윗을 삭제할 때 트윗의 작성자만 삭제를 할 수 있도록 할 건데 
        // 유저의 ID와 userId에 저장된 ID가 일치하는 지 확인해야 하니까 유저 ID도 저장
      });

      if (file) {
        // 업로드된 파일이 저장되는 폴더명과 파일명 지정
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`
          // 업로드된 파일은 tweets/(유저 ID)/(문서 ID)에 저장됨
          // tweets라는 폴더 내에 유저가 올리는 모든 파일은 해당 유저의 폴더 안에 저장하고 이미지의 이름을 트윗의 ID로 하여 빨리 삭제하도록 함
        );

        // 파일을 어디에 저장하고 싶은 지 알려줘야 함
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);

        // 파일을 업로드한 후에 그 파일의 url을 받아서 전에 적었던 트윗에 이미지 url을 함께 저장
        await updateDoc(doc, {
          photo: url, 
        });
      }

      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?!"
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo added" : "Add photo"}
      </AttachFileButton>
      {/* htmlFor과 id를 연결해놔서 Add photo를 눌러도 아래의 파일 input이 실행됨 */}
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
        // 이미지 파일이라면 모든 확장자 가능
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}