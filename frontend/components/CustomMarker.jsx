import { InfoBox, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import { Button, notification, Typography } from "antd";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import deleteMarker from "../helpers/api/deleteMarker";

const { Text, Link: AntLink, Title } = Typography;

const CustomMarker = (props) => {
  const {
    id,
    title,
    description,
    position,
    onPickMarker,
    user,
    setVisibleBox,
    visibleBox,
    isOwner,
  } = props;
  const [removeMarkerLoading, setRemoveMarkerLoading] = useState(false);
  const router = useRouter();
  const onMarkerClick = () => {
    onPickMarker({ position });
  };

  const handleRemoveMarker = async () => {
    setRemoveMarkerLoading(true);
    const [error, response] = await deleteMarker({ id });
    if (error) {
      notification.error({
        key: "error-remove-marker",
        message: "Something went wrong",
        description: "Something went wrong with remove marker. Try again!",
      });
    }
    if (response) {
      notification.success({
        key: "remove-marker",
        message: "Removed marker!",
        description: "Successfully removed marker.",
      });
    }
    setRemoveMarkerLoading(false);
    router.replace(router.asPath);
  };

  return (
    <>
      <Marker onClick={onMarkerClick} {...props} />
      {visibleBox?.open && visibleBox?.id === id && (
        <InfoBox
          position={position}
          onCloseClick={() => setVisibleBox({ id: null, open: false })}
        >
          <div className="tooltip-marker">
            <Title level={5}>{title}</Title>
            <Text>{description}</Text>
            <Link href={`/users/${user?.id}`}>
              <AntLink>{user?.username}</AntLink>
            </Link>
            {isOwner && (
              <div className="self-end">
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  loading={removeMarkerLoading}
                  onClick={handleRemoveMarker}
                />
              </div>
            )}
          </div>
        </InfoBox>
      )}
    </>
  );
};

export default CustomMarker;
