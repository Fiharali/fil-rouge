<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use App\Models\Campus;
use App\Models\ClassName;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{


    public  function  index(){
        $apprenant = User::whereHas('roles',function ($query){
            $query->where('name','apprenant');
        })->count();

        $staff = User::whereHas('roles',function ($query){
            $query->where('name','staff');
        })->count();

        $classes=ClassName::count();
        $campuses=Campus::count();

        $absences = Absence::select('date', DB::raw('count(*) as count'))
            ->groupBy('date')
            ->get();

        $absencesWithStatus = Absence::query()
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();


        return response()->json([
            'apprenant' =>$apprenant,
            'staff' =>$staff,
            'classes' =>$classes,
            'campuses' =>$campuses,
            'absences' =>$absences,
            'absencesWithStatus' =>$absencesWithStatus,

        ]);

    }
}
