<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{





    public function  Login(Request $request){

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(
                [
                    'error'=>'these credentials do not match our records .',
                ], Response::HTTP_UNAUTHORIZED);
        }

        $user=Auth::user();
        $token=$user->createToken('usertoken')->plainTextToken;

        return response([
            'user'=>new UserResource($user),
            'token'=>$token,
        ]);
    }

    public function  Register(Request $request){


        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
    }


    public function  logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'User logged out successfully'], 200);


    }


    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);
        $status = Password::sendResetLink(
            $request->only('email')
        );
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Password reset link sent successfully'], 200)
            : response()->json(['error' => 'Unable to send password reset link.'], 404);

    }


    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation' ,'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->save();
            }
        );
        return response()->json(['message' => 'Password reset  successfully'], 200);
    }
}
