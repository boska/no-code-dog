import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64">
        <h1 className="text-2xl font-medium text-white">註冊帳號</h1>
        <p className="text-sm text-gray-400">
          已經有帳號了？{" "}
          <Link className="text-red-500 font-medium hover:text-red-400" href="/sign-in">
            立即登入
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email" className="text-gray-300">電子信箱</Label>
          <Input name="email" placeholder="請輸入電子信箱" required />
          <Label htmlFor="password" className="text-gray-300">密碼</Label>
          <Input
            type="password"
            name="password"
            placeholder="請設定密碼（至少6個字元）"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="註冊中...">
            註冊
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
