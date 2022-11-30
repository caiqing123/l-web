<?php

namespace App\Http\Requests\API;

/**
 * @property string $email
 * @property string $password
 */
class UserLoginRequest extends Request
{
    /** @return array<mixed> */
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required',
            'code' => ['required', function ($attribute, $value, $fail) {
                if (!captcha_api_check($value, $this->get("key"))) {
                    $fail('验证码错误');
                }
            }],
        ];
    }
}
