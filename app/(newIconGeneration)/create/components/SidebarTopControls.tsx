import React from "react";
import { Eye, EyeOff, FileEdit, Lock, Trash, Unlock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBaseIconConfig,
  updateBaseIconLocked,
  updateBaseIconVisibility,
} from "@/store/features/playground/baseIconSlice";
import { useDropzone } from "react-dropzone";
import {
  addIconsArrayIcon,
  selectIconsArrayConfig,
  updateIconsArrayIconLocked,
  updateIconsArrayIconVisible,
} from "@/store/features/playground/iconsArraySlice";

const SidebarTopControls = () => {
  const baseIconConfig = useSelector(selectBaseIconConfig);
  const iconArrayConfig = useSelector(selectIconsArrayConfig);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const base64Promises = acceptedFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e?.target?.result); // Optional chaining here
            reader.readAsDataURL(file);
          })
      );
      const base64Results = await Promise.all(base64Promises);
      dispatch(
        addIconsArrayIcon({
          locked: false,
          visible: true,
          base64: base64Results[0] as string,
        })
      );
    },
  });

  return (
    <div className="flex-1 mt-3">
      <p className="font-bold">Layers</p>
      <ul className="text-xs mt-2">
        <li className=" text-foreground/60 py-2 border-t border-b flex justify-between">
          Base Icon
          <span className="flex flex-wrap gap-2">
            {/* TODO: add dispatch to change url */}
            <button className="">
              <FileEdit width={10} height={10} />
            </button>
            <button
              className=""
              onClick={() =>
                dispatch(updateBaseIconVisibility(!baseIconConfig.visible))
              }
            >
              {baseIconConfig.visible ? (
                <Eye width={10} height={10} />
              ) : (
                <EyeOff width={10} height={10} />
              )}
            </button>
            <button
              className=""
              onClick={() =>
                dispatch(updateBaseIconLocked(!baseIconConfig.locked))
              }
            >
              {baseIconConfig.locked ? (
                <Lock width={10} height={10} />
              ) : (
                <Unlock width={10} height={10} />
              )}
            </button>
          </span>
        </li>
        {iconArrayConfig.map((item, index) => (
          <li
            key={index}
            className="flex w-full justify-between text-foreground/60 border-b py-2"
          >
            <span className="flex gap-1 items-center ">Layer {item.id}</span>
            <span className="flex gap-2">
              <button>
                <Trash width={10} height={10} />
              </button>
              <button
                onClick={() =>
                  dispatch(
                    updateIconsArrayIconVisible({
                      id: item.id,
                      visible: !item.visible,
                    })
                  )
                }
              >
                {item.visible === true ? (
                  <Eye width={10} height={10} />
                ) : (
                  <EyeOff width={10} height={10} />
                )}
              </button>
              <button
                onClick={() =>
                  dispatch(
                    updateIconsArrayIconLocked({
                      id: item.id,
                      locked: !item.locked,
                    })
                  )
                }
              >
                {item.locked === true ? (
                  <Lock width={10} height={10} />
                ) : (
                  <Unlock width={10} height={10} />
                )}
              </button>
            </span>
          </li>
        ))}
      </ul>

      {/* TODO: Paste feature is to be added here */}
      <div
        {...getRootProps({
          className:
            "dropzone bg-muted rounded-md mt-3 h-24 flex items-center justify-center p-3 text-center border-2 border-dashed ",
        })}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-foreground/60 ">
          Drag and drop here, or paste files, or click to select files
        </p>
      </div>
    </div>
  );
};

export default SidebarTopControls;
// const toggleVisibilty = (id: number) => {
//   setlayersArray((prev) =>
//     prev.map((item) =>
//       item.id === id ? { ...item, visible: !item.visible } : item
//     )
//   );
// };
