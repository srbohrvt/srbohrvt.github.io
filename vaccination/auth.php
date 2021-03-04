<?php 
class User {
  public $ssn;
  public $adress;
  public $fullname;
  public $roles;
  public $email;
  public $appoint;
  private $password;

  public function __construct($email, $ssn, $adress, $password, $fullname, $roles = ["user"]) {
    $this->ssn = $ssn;
    $this->email = $email;
    $this->adress = $adress;
    $this->password = $password;
    $this->fullname = $fullname;
    $this->roles = $roles;
    $this->appoint = "";
  }

  public function hasRole($role) {
    return in_array($role, $this->roles);
  }

  public function verifyPassword($password) {
    return password_verify($password, $this->password);
  }
}

interface IAuthStorage {
  public function restore();
  public function register($ssn, $password, $fullname, $adress, $email);
  public function authenticate($email, $password);
  public function authorize($roles = []);
  public function isAuthenticated();
  public function login($user_id);
  public function logout();
}

class UserStorage extends JsonStorage implements IAuthStorage {
  public $user = NULL;
  public $userId = NULL;

  public function __construct($data_file = "users.json") {
    parent::__construct($data_file);
    $this->restore();
  }

  public function restore() {
    if (isset($_SESSION["user-id"])) {
      $user_id = $_SESSION["user-id"];
      $this->user = $this->findById($user_id);
      $this->userId = $user_id;
    }
  }

  public function register($ssn, $password, $fullname, $adress, $email) {
    if ($email === "admin@nemkovid.hu")
      $r = ["admin"];
    else 
      $r = ["user"];
    $user = [
      "ssn" => $ssn,
      "email" => $email,
      "adress" => $adress,
      "password" => password_hash($password, PASSWORD_DEFAULT),
      "fullname" => $fullname,
      "roles" => $r,
      "appoint" => ""
    ];

    return $this->add($user);
  }

  public function authenticate($email, $password) {
    $users = $this->query(function ($user) use ($email, $password) {
      return $user["email"] === $email && password_verify($password, $user["password"]);
    });

    if (empty($users)) {
      return FALSE;
    }

    $user_id = array_keys($users)[0];
    return $user_id;
  }

  public function isAuthenticated() {
    return !is_null($this->user);
  }

  public function authorize($roles = []) {
    if (!$this->isAuthenticated()) {
      return FALSE;
    }

    foreach ($roles as $role) {
      if (in_array($role, $this->user["roles"])) {
        return TRUE;
      }
    }

    return FALSE;
  }

  public function login($user_id) {
    $this->user = $this->findById($user_id);
    $this->userId = $user_id;
    $_SESSION["user-id"] = $user_id;
  }

  public function logout() {
    $this->user = NULL;
    $this->userId = NULL;
    unset($_SESSION["user-id"]);
  }
}

class UserObjectStorage extends SerializeObjectStorage implements IAuthStorage {
  public $user = NULL;
  public $userId = NULL;

  public function __construct($data_file = "storage/users.storage") {
    parent::__construct($data_file);
    $this->restore();
  }

  public function restore() {
    if (isset($_SESSION["user-id"])) {
      $user_id = $_SESSION["user-id"];
      $this->user = $this->findById($user_id);
    }
  }

  public function register($ssn, $password, $fullname, $adress, $email) {
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $user = new User($email, $ssn, $adress, $password, $fullname);
    return $this->add($user);
  }

  public function authenticate($email, $password) {
    $users = $this->query(function ($user) use ($email, $password) {
      return $user->email === $email && $user->verifyPassword($password);
    });

    if (empty($users)) {
      return FALSE;
    }

    $user_id = array_keys($users)[0];
    return $user_id;
  }

  public function isAuthenticated() {
    return !is_null($this->user);
  }

  public function authorize($roles = []) {
    if (!$this->isAuthenticated()) {
      return FALSE;
    }

    foreach ($roles as $role) {
      if ($this->user->hasRole($role)) {
        return TRUE;
      }
    }

    return FALSE;
  }

  public function login($user_id) {
    $this->user = $this->findById($user_id);
    $this->userId = $user_id;
    $_SESSION["user-id"] = $user_id;
  }

  public function logout() {
    $this->user = NULL;
    $this->userId = NULL;
    unset($_SESSION["user-id"]);
  }
}

?>