<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Campus;
use App\Models\City;
use App\Models\ClassName;
use App\Models\Level;
use App\Models\Promotion;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
/**
 * @OA\Info(
 *      title="Users API",
 *      version="1.0.0",
 *      description="API to manage students",
 * )
 */
class UserController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Get all users",
     *     description="Retrieve a list of all users",
     *     @OA\Response(response="200", description="List of users"),
     *     @OA\Response(response="404", description="No user found"),
     *
     * )
     */

    public function index()
    {


            $users=User::paginate(8);
            return response([
                'users' => UserResource::collection($users),
                'pagination' => [
                    'total' => $users->total(),
                    'current_page' => $users->currentPage(),
                    'total_pages' => $users->lastPage(),

                ],
                'cities' => City::all(),
                'campuses' => Campus::all(),
                'promotions' => Promotion::all(),
                'levels' => Level::all(),
                'class_names' => ClassName::all(),
                'roles' => Role::all(),
            ]);

    }

    /**
     * @OA\Post(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Create a new user",
     *     description="Create a new student with provided name and age",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"firs_name", "firs_name","email","number","password"},
     *             @OA\Property(property="firs_name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="number", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(response="201", description="User created"),
     *     @OA\Response(response="400", description="Bad request")
     * )
     */
    public function store(StoreUserRequest $request)
    {
        $user=User::create($request->all());

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $user->addMedia($file)->toMediaCollection('images');
        }

         $user->roles()->attach($request->role);
        return response([
            'success' => 'User added Successful',
        ]);

    }
    /**
     * @OA\Get(
     *     path="/api/users/{user}",
     *     tags={"Users"},
     *     summary="Edit a user",
     *     description="Update the details of a user",
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID of the users to update",
     *         @OA\Schema(type="integer")
     *     ),
     *
     *     @OA\Response(response="200", description="Student updated"),
     *     @OA\Response(response="400", description="Bad request"),
     *     @OA\Response(response="404", description="Student not found")
     * )
     */
    public function show(User $user)
    {

        return response([
            'user' => new UserResource($user),
            'cities' => City::all(),
            'campuses' => Campus::all(),
            'promotions' => Promotion::all(),
            'levels' => Level::all(),
            'class_names' => ClassName::all(),
            'roles' => Role::all(),
        ]);
    }


    /**
     * @OA\Put(
     *     path="/api/users/{user}",
     *     tags={"Users"},
     *     summary="Update a user",
     *     description="Update the details of a user",
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID of the users to update",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              required={"firs_name", "firs_name","email","number","password"},
     *              @OA\Property(property="firs_name", type="string"),
     *              @OA\Property(property="email", type="string"),
     *              @OA\Property(property="number", type="string"),
     *              @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(response="200", description="Student updated"),
     *     @OA\Response(response="400", description="Bad request"),
     *     @OA\Response(response="404", description="Student not found")
     * )
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        if ($request->hasFile('image')) {
            $user->clearMediaCollection('images');
            $user->addMediaFromRequest('image')->toMediaCollection('images');
        }

        $user->roles()->sync($request->role_id);
        return response([
            'success' => 'User updated Successful',
        ]);
    }
    /**
     * @OA\Delete(
     *     path="/api/users/{user}",
     *     tags={"Users"},
     *     summary="Delete a user",
     *     description="Delete a users by its ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the student to delete",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="204", description="user deleted"),
     *     @OA\Response(response="404", description="user not found")
     * )
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response([
            'success' => 'User deleted Successful',
        ]);
    }


    public function search(Request $request){
        $users = User::query();

        if ($request->has('query')) {
            $users->where(function ($query) use ($request) {
                $query->where('first_name', 'like', '%' . $request->input('query') . '%')
                    ->orWhere('last_name', 'like', '%' . $request->input('query') . '%');
            });
        }

        if ($request->has('role') && $request->input('role')!="") {
            $role = $request->input('role');
            $users->whereHas('roles', function ($query) use ($role) {
                    $query->where('roles.id', $role);
            });

        }

        // Paginate the results
        $allUsers = $users->paginate(8);

        return response([
            'users' => UserResource::collection($allUsers),
            'pagination' => [
                'total' => $allUsers->total(),
                'current_page' => $allUsers->currentPage(),
                'total_pages' => $allUsers->lastPage(),
            ],
        ]);
    }


public function  oldUsers(){
    $users=User::onlyTrashed()->orderBy('deleted_at','desc')->get();
    return response([
        'users' => UserResource::collection($users),
       ]);
}

    public function  restore(User $user){
        $user->restore();
        return response([
            'success' => 'User restored Successful',
        ]);
    }


}


