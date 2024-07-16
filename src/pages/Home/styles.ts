import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
`;

export const ScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  overflow-x: auto;
  width: 95%;
  min-height: 65vh;
  padding-bottom: 1.5rem;

  ::-webkit-scrollbar {
    height: 15px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #007bff;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }
`;
