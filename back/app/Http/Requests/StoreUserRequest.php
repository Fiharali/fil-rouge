<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'number' => 'required',
            'password' => 'required|string|min:8|max:255',
            'level_id' => 'required',
            'class_name_id' => 'required',
            'promotion_id' => 'required',
            'campus_id' => 'required',
            'city_id' => 'required', 'image' => 'required|image',
        ];
    }
}
