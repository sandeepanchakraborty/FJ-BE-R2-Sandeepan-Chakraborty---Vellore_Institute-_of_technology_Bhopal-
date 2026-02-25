import React from "react";
import {toast} from "sonner";
import { useForm } from "react-hook-form";
import useStore from "../store";
import Input from "./ui/input";
import api from "../libs/apiCall";
import { Button } from "./ui/button";
import { useState } from "react";

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const submitPasswordHandler = async (data) => {
    try {
      setLoading(true);

      const { data: res } = await api.put("/user/change-password", data);

      if (res?.status === "success") {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
 return (
  <div className="py-20">
    <form onSubmit={handleSubmit(submitPasswordHandler)}>
      <div>
        <p className="text-xl font-bold text-black dark:text-white mb-1">
          Change Password
        </p>
        <span className="labelStyles">
          This will be used to log into your account and complete high severity actions.
        </span>
      </div>
      <div className="mt-6">
        <Input
          disabled={loading}
          type="password"
          name="currentPassword"
          label="Current Password"
          {...register("currentPassword", {
            required: "Current Password is required!",
          })}
          error={errors.currentPassword ? errors.currentPassword.message : ""}
        />
        <Input
          disabled={loading}
          type="password"
          name="newPassword"
          label="New Password"
          {...register("newPassword", {
            required: "New Password is required!",
          })}
          error={errors.newPassword ? errors.newPassword.message : ""}
        />
        <Input
          disabled={loading}
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required!",
            validate: (value) => {
              const newPassword = getValues();
              return newPassword === value || "Passwords do not match!";
            },
          })}
          error={errors.confirmPassword ? errors.confirmPassword.message : ""}
        />
      </div>
      <div className="flex items-center gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border-gray-800">
              <Button
                variant="outline"
                loading={loading}
                type="reset"
                className="px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700"
              >
                Reset
              </Button>
              <Button
                loading={loading}
                type="submit"
                className="px-8 bg-violet-800 text-white"
              >
                Save
              </Button>
            </div>
    </form>
  </div>
);
};
