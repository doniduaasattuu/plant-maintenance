<?php

namespace App\Exports;

use App\Http\Resources\Export\UserExportResource;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $users = User::select(
            'id',
            'first_name',
            'last_name',
            'department_id',
            'position_id',
            'email',
            'phone_number',
        )->get();

        return UserExportResource::collection($users);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Department',
            'Position',
            'Email',
            'Phone',
        ];
    }
}
