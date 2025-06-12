"use client";

import { useProfileForm } from "./profile-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProfileContent() {
  const form = useProfileForm();
  return <div>profile content</div>;
}
