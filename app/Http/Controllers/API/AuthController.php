<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\UserLoginRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\TokenManager;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Hashing\HashManager;
use Illuminate\Http\Response;

class AuthController extends Controller
{

    /** @param User $user */
    public function __construct(
        private UserRepository   $userRepository,
        private HashManager      $hash,
        private TokenManager     $tokenManager,
        private ?Authenticatable $user
    )
    {
    }

    public function login(UserLoginRequest $request)
    {
        /** @var User|null $user */
        $user = $this->userRepository->getFirstWhere('email', $request->email);

        if (!$user || !$this->hash->check($request->password, $user->password)) {
            abort(Response::HTTP_UNAUTHORIZED, '账号或密码错误');
        }

        return response()->json([
            'token' => $this->tokenManager->createToken($user)->plainTextToken,
        ]);
    }

    public function logout()
    {
        $this->user?->currentAccessToken()->delete(); // @phpstan-ignore-line

        return response()->noContent();
    }
}
