import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 3rem auto;
  border-radius: 16px;
`;

export const Certificate = styled.div`
  width: calc((100% / 3) - 1.5rem);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
`;
export const CardImage = styled.img`
  width: 90%;
  border-radius: 16px 16px 0 0;
  margin-top: 1rem;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #374b04;
  margin-top: 1.5rem;
  margin-bottom: 0.35rem;
  font-size: 16px;
`;

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  width: ${({ progress }) => progress}%;
  height: 1rem;
  background-color: #374b04;
  transition: width 0.3s ease;
  border-radius: 0px 8px 8px 0;
`;
