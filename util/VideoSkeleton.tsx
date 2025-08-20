import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const InfoSkeleton = () => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={180}
    backgroundColor="#e0e0e0"
    foregroundColor="#f5f5f5"
  >
    {/* Avatar */}
    <Circle cx="30" cy="30" r="20" />

    {/* Name line */}
    <Rect x="60" y="20" rx="4" ry="4" width="40%" height="12" />

    {/* Small subtitle */}
    <Rect x="60" y="40" rx="4" ry="4" width="25%" height="10" />

    {/* Divider */}
    <Rect x="0" y="70" rx="0" ry="0" width="100%" height="1" />

    {/* Info rows */}
    <Rect x="0" y="90" rx="4" ry="4" width="90%" height="12" />
    <Rect x="0" y="110" rx="4" ry="4" width="80%" height="12" />
    <Rect x="0" y="130" rx="4" ry="4" width="95%" height="12" />
    <Rect x="0" y="150" rx="4" ry="4" width="70%" height="12" />
  </ContentLoader>
);

export default InfoSkeleton;
