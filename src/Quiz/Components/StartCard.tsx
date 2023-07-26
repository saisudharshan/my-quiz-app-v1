import { Result, Select } from "antd";
import React from "react";
interface LayoutProps {
    value: number,
    setValue: (e: number) => void;
}
const StartCard = (props: LayoutProps) => {
  return (
    <>
      <Result
        icon={<img src="/ideas.png" width={100} height={100} />}
        title="Start Quiz by Selecting no of Question"
        extra={[
          <Select defaultValue={5} value={props.value} onChange={(e: number) => props.setValue(e) } style={{ width: 120 }}>
            <Select.Option value={5}> 5</Select.Option>
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={20}>20</Select.Option>
          </Select>,
        ]}
      />
    </>
  );
};

export default StartCard;
