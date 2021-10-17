import { Marker } from "@react-google-maps/api";

const CustomMarker = (props) => {
  const { id, title, description, position, setCenter } = props;
  const onMarkerClick = () => {
    setCenter(position);
    console.log(id, title, description);
  };

  return <Marker onClick={onMarkerClick} {...props} />;
};

export default CustomMarker;
