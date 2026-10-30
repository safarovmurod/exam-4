import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Loader2, Camera } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import { getUserProfile, updateUserProfile } from "../store/userSlice";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    if (file.size < 300 * 1024) {
      resolve(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const max = 400;

        if (width > height) {
          if (width > max) {
            height = Math.round((height * max) / width);
            width = max;
          }
        } else {
          if (height > max) {
            width = Math.round((width * max) / height);
            height = max;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            0.8
          );
        } else {
          resolve(file);
        }
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export default function Account() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { profile, isLoading, isSaving, error, successMessage } = useSelector(
    (state: RootState) => state.user
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const apiUrl = import.meta.env.VITE_API?.replace(/\/$/, "");
  const inputClass = "h-[44px] w-full rounded-[4px] border border-[#dddddd] p-[12px] text-[14px]";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(getUserProfile());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      let currentEmail = profile.email || "";
      if (!currentEmail) {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            currentEmail = payload.email || "";
          }
        } catch (err) {
          console.error(err);
        }
      }
      setEmail(currentEmail);
      setPhoneNumber(profile.phoneNumber || "");
    }
  }, [profile]);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setImageFile(compressed);
    setImagePreview(URL.createObjectURL(compressed));
  }

  async function handleSaveChanges(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await dispatch(
      updateUserProfile({
        firstName,
        lastName,
        email,
        phoneNumber,
        imageFile,
      })
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[48px] pb-[100px] md:pt-[72px]">
      <div className="flex gap-[12px] text-[14px] text-[#777777]">
        <Link to="/home">Home</Link>
        <span>/</span>
        <span className="text-[#000000]">My Account</span>
      </div>

      <div className="mt-[48px] flex flex-col gap-[40px] md:flex-row md:gap-[80px]">
        <aside className="w-full text-[14px] md:w-[220px]">
          <h2 className="font-[500]">Manage My Account</h2>
          <div className="mt-[12px] flex flex-col gap-[8px] pl-[24px] text-[#777777]">
            <span className="font-[500] text-[#DB4444]">My Profile</span>
            <span>Address Book</span>
            <span>My Payment Options</span>
          </div>

          <h2 className="mt-[24px] font-[500]">My Orders</h2>
          <div className="mt-[12px] flex flex-col gap-[8px] pl-[24px] text-[#777777]">
            <span>My Returns</span>
            <span>My Cancellations</span>
          </div>

          <Link to="/wishlist" className="mt-[24px] block font-[500]">
            My Wishlist
          </Link>
        </aside>

        <div className="w-full max-w-[800px] bg-[#ffffff] p-[24px] shadow-[0_4px_20px_#00000020] md:p-[40px]">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] font-[500] text-[#DB4444]">Profile</h1>
            {isLoading && <Loader2 className="h-[20px] w-[20px] animate-spin text-[#DB4444]" />}
          </div>

          <form onSubmit={handleSaveChanges} className="mt-[24px]">
            <div className="mb-[24px] flex items-center gap-[20px]">
              <label
                title="Интихоби акс"
                className="group relative flex h-[80px] w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-[50%] border border-[#dddddd] bg-[#f5f5f5] shadow-sm transition hover:border-[#DB4444]"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Avatar" className="h-full w-full object-cover" />
                ) : profile?.image ? (
                  <img
                    src={`${apiUrl}/images/${profile.image}`}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-[40px] w-[40px] text-[#777777]" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-[#00000040] opacity-0 transition group-hover:opacity-100">
                  <Camera className="h-[24px] w-[24px] text-[#ffffff]" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <div className="flex flex-col">
                <span className="text-[18px] font-[500] text-[#000000]">
                  {profile?.userName || "User"}
                </span>
                <span className="text-[13px] text-[#777777]">
                  {profile?.email || email || ""}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-[20px] md:flex-row">
              <label className="w-full text-[14px]">
                First name
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${inputClass} mt-[8px]`}
                  placeholder="First name"
                />
              </label>
              <label className="w-full text-[14px]">
                Last name
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`${inputClass} mt-[8px]`}
                  placeholder="Last name"
                />
              </label>
            </div>

            <div className="mt-[20px] flex flex-col gap-[20px] md:flex-row">
              <label className="w-full text-[14px]">
                Email address
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} mt-[8px]`}
                  placeholder="Email address"
                />
              </label>
              <label className="w-full text-[14px]">
                Phone number
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`${inputClass} mt-[8px]`}
                  placeholder="Phone number"
                />
              </label>
            </div>

            <h2 className="mt-[32px] text-[16px] font-[500]">Password Changes</h2>
            <Input
              type="password"
              aria-label="Current password"
              className={`${inputClass} mt-[12px]`}
              placeholder="Current password"
            />
            <div className="mt-[16px] flex flex-col gap-[16px] md:flex-row">
              <Input
                type="password"
                aria-label="New password"
                className={inputClass}
                placeholder="New password"
              />
              <Input
                type="password"
                aria-label="Confirm new password"
                className={inputClass}
                placeholder="Confirm new password"
              />
            </div>

            {successMessage && (
              <p className="mt-[16px] text-[14px] text-[#00a65a]">{successMessage}</p>
            )}
            {error && (
              <p className="mt-[16px] text-[14px] text-[#DB4444]">{error}</p>
            )}

            <div className="mt-[32px] flex flex-col-reverse items-center justify-end gap-[16px] md:flex-row">
              <Link to="/home" className="p-[12px] text-[14px] text-[#777777]">
                Cancel
              </Link>
              <Button
                type="submit"
                disabled={isSaving}
                className="h-auto w-full cursor-pointer rounded-[4px] bg-[#DB4444] p-[12px] pl-[32px] pr-[32px] text-[14px] text-[#ffffff] hover:bg-[#b83838] md:w-auto"
              >
                {isSaving ? "Сабт шуда истодааст..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
