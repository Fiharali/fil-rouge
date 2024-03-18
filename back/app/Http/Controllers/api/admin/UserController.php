<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return User::all();

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function  Login(Request $request){

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(
                [
                    'error'=>'these credentials do not match our records .',
                ], Response::HTTP_UNAUTHORIZED);
        }

        return Auth::user();
    }

    public function  Register(Request $request){


        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
    }
}


//INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `number`, `password`, `level`, `class_name`, `promotion`, `campus`, `created_at`, `updated_at`)
//VALUES
//('1', 'ali', 'fihar', 'alifihar@gmail.com', '061278766', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'tyds dysd', 'sdgcsd ', 'sdgsd', 'sgcsd', '2024-03-20 12:47:21', '2024-03-21 12:47:21'),
//    ('2', 'John', 'Doe', 'johndoe@example.com', '0612345678', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Junior', 'Computer Science', '2025', 'Main Campus', '2024-03-18 09:30:00', '2024-03-18 09:30:00'),
//    ('3', 'Emily', 'Smith', 'emilysmith@example.com', '0612987654', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Senior', 'Engineering', '2023', 'North Campus', '2024-03-18 10:45:00', '2024-03-18 10:45:00'),
//    ('4', 'Maria', 'Garcia', 'mariagarcia@example.com', '0612765432', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Sophomore', 'Mathematics', '2026', 'East Campus', '2024-03-18 11:15:00', '2024-03-18 11:15:00'),
//    ('5', 'Michael', 'Brown', 'michaelbrown@example.com', '0612890432', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Freshman', 'Biology', '2027', 'West Campus', '2024-03-18 12:00:00', '2024-03-18 12:00:00'),
//    ('6', 'Sarah', 'Johnson', 'sarahjohnson@example.com', '0612789543', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Junior', 'Psychology', '2025', 'South Campus', '2024-03-18 13:30:00', '2024-03-18 13:30:00'),
//    ('7', 'David', 'Martinez', 'davidmartinez@example.com', '0612987651', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Senior', 'Sociology', '2023', 'Main Campus', '2024-03-18 14:45:00', '2024-03-18 14:45:00'),
//    ('8', 'Jessica', 'Davis', 'jessicadavis@example.com', '0612876543', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Sophomore', 'English', '2026', 'East Campus', '2024-03-18 15:15:00', '2024-03-18 15:15:00'),
//    ('9', 'Daniel', 'Rodriguez', 'danielrodriguez@example.com', '0612789087', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Freshman', 'History', '2027', 'West Campus', '2024-03-18 16:00:00', '2024-03-18 16:00:00'),
//    ('10', 'Ashley', 'Wilson', 'ashleywilson@example.com', '0612678901', '$2y$12$mKTL4SV1bK/u9tcsY8.4OuGeVrXjHbGi1dSNx9QSQyBp2fqY5oWmG', 'Junior', 'Art', '2025', 'South Campus', '2024-03-18 17:30:00', '2024-03-18 17:30:00');

