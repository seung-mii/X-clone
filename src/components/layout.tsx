import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h2>layout</h2>
      <Outlet />
      {/* 
        하위 경로 요소를 렌더링하기 위해 상위 경로 요소에서 Outlet을 사용
        이를 통해 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있음 
      */}
    </>
  );
}