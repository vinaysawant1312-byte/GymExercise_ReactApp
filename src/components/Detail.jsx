import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import { fetchData, exerciseOption } from "../utils/fetchData";
import { useState, useEffect } from "react";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, target, name, equipment, id } = exerciseDetail;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    let objectUrl;

    const loadImage = async () => {
      try {
        const blob = await fetchData(
          `/api/image?exerciseId=${id}&resolution=720`,
          { ...exerciseOption, returnType: "blob" },
        );
        objectUrl = URL.createObjectURL(blob);
        if (mounted) setImageUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load exercise image:", err);
      }
    };

    loadImage();
    return () => {
      mounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id]);

  const extraDetails = [
    { icon: BodyPartImage, label: "Body Part", value: bodyPart },
    { icon: TargetImage, label: "Target", value: target },
    { icon: EquipmentImage, label: "Equipment", value: equipment },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-30 mt-10 px-6">
      {/* Image side */}
      <div className="flex-shrink-0 flex items-center justify-center bg-amber-50 rounded-3xl shadow-lg p-4 w-fit">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: "360px",
              height: "360px",
              objectFit: "contain",
              filter: "contrast(1.1) saturate(1.2)",
            }}
            className="rounded-2xl"
          />
        ) : (
          <div className="w-[360px] h-[360px] bg-amber-100 animate-pulse rounded-2xl" />
        )}
      </div>

      {/* Info side */}
      <div className="flex flex-col justify-center gap-6">
        <h1 className="text-4xl font-extrabold capitalize text-gray-800">
          {name}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-md">
          This exercise targets your{" "}
          <span className="text-amber-500 font-semibold">{target}</span> using{" "}
          <span className="text-amber-500 font-semibold">{equipment}</span>.
          Great for building strength and improving mobility.
        </p>

        {/* Detail badges */}
        <div className="flex flex-col gap-4">
          {extraDetails.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shadow-sm">
                <img
                  src={icon}
                  alt={label}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-base font-semibold capitalize text-gray-700">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
