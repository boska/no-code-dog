import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium text-white">會員登入</h1>
      <p className="text-sm text-gray-400">
        還沒有帳號？{" "}
        <Link className="text-red-500 font-medium hover:text-red-400" href="/sign-up">
          立即註冊
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email" className="text-gray-300">電子信箱</Label>
        <Input name="email" placeholder="請輸入電子信箱" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-gray-300">密碼</Label>
          <Link
            className="text-xs text-gray-400 hover:text-gray-300"
            href="/forgot-password"
          >
            忘記密碼？
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="請輸入密碼"
          required
        />
        <SubmitButton pendingText="登入中..." formAction={signInAction}>
          登入
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
