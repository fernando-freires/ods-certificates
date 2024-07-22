import styled from "@emotion/styled";

export const CardWrapper = styled.div`
  background-color: #fff;
  height: 100%;
  border-radius: 16px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-bottom: 1rem;
  min-height: 28rem;
  min-width: 20rem;
`;

export const CardImage = styled.img`
  width: 100%;
  border-radius: 16px 16px 0 0;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #374b04;
  margin-top: 1.5rem;
  font-size: 16px;
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

export const CardInfoContainer = styled.div`
  min-height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  margin-left: 1rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  margin-bottom: -0.4rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const Percentage = styled.h2`
  margin: 0;
  color: #aaa;
  font-size: 16px;
  margin-bottom: -0.05rem;
  margin-right: 0.5rem;
`;

export const ProgressContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
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
