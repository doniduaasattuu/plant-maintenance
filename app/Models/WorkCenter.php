<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkCenter extends Model
{
    use HasFactory;

    protected $table = 'work_centers';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
}
