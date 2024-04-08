<?php

namespace App\Http\Controllers\api\apprenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAbsenceRequest;
use App\Http\Resources\AbsenceResource;
use App\Http\Resources\UserResource;
use App\Models\Absence;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $absences=Absence::where('user_id',$request->user()->id)->get();
        return response([
            'absences' => AbsenceResource::collection($absences),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAbsenceRequest $request)
    {
        $absence=Absence::create([
            'date'=>$request->date,
            'type_id'=>$request->type,
            'status'=>0,
            'user_id'=>$request->user()->id,
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $absence->addMedia($file)->toMediaCollection('absences');
        }
        return response([
            'success' => 'User absence Successful',
        ]);
    }


    public function allTypes()
    {
        return Type::all();
    }

    public function usersForAbsence(){

        $users=User::all();
        return response([
            'users' => UserResource::collection($users),
            ]);
    }



}
