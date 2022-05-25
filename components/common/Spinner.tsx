import styled from "styled-components";

const Spinner = () => {
  return (
    <Loader>
      <div className="spinner"></div>
    </Loader>
  );
};

const Loader = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 15px solid lightgrey;
    border-top-color: #84a7ff;
    animation: spinner 0.8s linear infinite;
  }
`;

export default Spinner;
