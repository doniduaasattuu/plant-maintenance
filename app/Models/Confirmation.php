<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Confirmation extends Model
{
    use HasFactory;

    protected $table = 'confirmations';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $inrementing = true;
    public $timestamps = false;
}
